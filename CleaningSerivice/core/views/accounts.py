from core.models import CleaningServiceUser, VerificationToken, PasswordToken
from rest_framework import viewsets, status
from rest_framework.response import Response
from core.senders.accounts import create_user, create_verification_token
from core.retrievers.accounts import *
import threading
from core.utils import email_verification, verification_confirmation_email
from datetime import datetime, timedelta
import pytz
UTC = pytz.UTC
from rest_framework_simplejwt.tokens import RefreshToken
from core.serializers import CleaningServiceSerializer
from django.http import JsonResponse


class AccountViewset(viewsets.ViewSet):
    """Accounts viewset"""

    def create(self, request):
        """Create user"""
        email = request.data.get('email')
        password = request.data.get('password')
        account_type = request.data.get('user_type')
        user = get_user_by_email(email)
        organization_name = request.data.get('organization_name')
        organization_logo = request.data.get('organization_logo')
        if user:
            context = {
                'detail': 'User already exists'
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        user = create_user(email, password)
        user.user_type = account_type
        user.organization_name = organization_name
        user.organization_logo = organization_logo
        user.save()
        user_data = CleaningServiceSerializer(user).data
        context = {"detail": "User created successfully", "user": user_data}
        thread = threading.Thread(target=email_verification, args=[email, 4])
        thread.start()
        return Response(context, status=status.HTTP_201_CREATED)


    def send_verification_email(self, request):
        """
        Resends a verification pin to the email used in account creation
        """
        email = request.data.get("email")
        user = get_user_by_email(email)
        if not user:
            context = {"detail": "No account associated with email"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        if user.verified:
            return Response(
                {"detail": "Your account has already been verified"},
                status=status.HTTP_208_ALREADY_REPORTED,
            )
        user_token = get_verification_token(email)
        if user_token:
            user_token.delete()
        if email_verification(email, 6):
            context = {"detail": "Verification code successfully sent", "email": email}
            return Response(context, status=status.HTTP_200_OK)
        return Response(
            {"detail": "Could not send verification code"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def verify_email(self, request):
        """
        Verify the email address in a horux account if supplied
        verification PIN is valid
        """
        email = request.data.get("email")
        otp = request.data.get("otp")

        account = get_user_by_email(email)
        if not account:
            context = {"detail": "No account associated with this email"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        if account.verified:
            print(account.verified)
            context = {"detail": "Your account has already been verified", "status": True}
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationToken.objects.get(email=email)
        if str(otp).strip() == str(otp_detail.token).strip():
            print(f"Current time: {UTC.localize(datetime.now())}")
            print(f"Token time + 10 minutes: {otp_detail.time + timedelta(minutes=10)}")
            if UTC.localize(datetime.now()) < otp_detail.time + timedelta(minutes=10):
                account.verified = True
                account.save()
                otp_detail.delete()
                email_thread = threading.Thread(
                    target=verification_confirmation_email, args=[email]
                )

                email_thread.start()
                context = {
                    "detail": "Your email has been verified successfully",
                    "user": get_user_information(account),
                    "status": True,
                }

                return Response(context, status=status.HTTP_200_OK)

            else:
                otp_detail.delete()
                context = {"detail": "This otp has expired Request a new one",
                           "status": False}
                return Response(context, status=status.HTTP_200_OK)
        print(otp_detail.token)
        print(otp)
        context = {
                    "detail": "The otp you have provided is invalid",
                   "status": False
                   }
        return Response(context, status=status.HTTP_400_BAD_REQUEST)


class SignIn(viewsets.ViewSet):
    
    def post(self, request):
        """Sign in user with email and password
        

        Args:
            request (http): http request

        Raises:
            AuthenticationFailed: If user does not exist or password is incorrect
        Returns:
            http response: http response
        """
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response("Incorrect login credentials provided", status=status.HTTP_401_UNAUTHORIZED)

        user = get_user_by_email(email)

        if not user:
            context = {"error": "User not found"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)

        if user.check_password(password) and user.is_active:
            token = RefreshToken.for_user(user)
            user_data = get_user_information(email)
            context = {
                "detail": "Sign in successful",
                "user": user_data,
                "token": {"access": str(token.access_token), "refresh": str(token)},
            }
            response = Response(context, status=status.HTTP_200_OK)
            return response
        else:
            return Response("Incorrect login credentials provided", status=status.HTTP_401_UNAUTHORIZED)