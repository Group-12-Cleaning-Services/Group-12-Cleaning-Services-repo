from core.models import AccountUser, VerificationToken, PasswordToken
from rest_framework import viewsets, status
from rest_framework.response import Response
from core.senders.accounts import create_user, create_verification_token, update_user
from core.retrievers.accounts import *
import threading
from core.utils import email_verification, verification_confirmation_email
from datetime import datetime, timedelta
import pytz
UTC = pytz.UTC
from rest_framework_simplejwt.tokens import RefreshToken
from core.serializers import AccountUserSerializer, VerificationTokenSerializer
from django.http import JsonResponse


class AccountViewset(viewsets.ViewSet):
    """Accounts viewset"""
    def list(self, request):
        """List all users"""
        users = get_all_users()
        serializer = AccountUserSerializer(users, many=True)
        return Response(serializer.data)

    def create(self, request):
        """Create user"""
        email = request.data.get('email')
        user = get_user_by_email(email)
        if user:
            context = {
                'detail': 'User already exists'
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        user = create_user(request.data)
        context = {"detail": "User created successfully"}
        # thread = threading.Thread(target=email_verification, args=[email, 4])
        # thread.start()
        return Response(context, status=status.HTTP_201_CREATED)

    def retrieve(self, request, user_id):
        """Retrieve user"""
        user = get_user_by_id(user_id)
        if not user:
            context = {"detail": "User not found"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        serializer = AccountUserSerializer(user)
        return Response(serializer.data)
    
    def update(self, request, user_id):
        """Update user"""
        user = get_user_by_id(user_id)
        password = request.data.get('password')
        if not user:
            context = {
                'detail': 'User not found'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        updated_user = update_user(user, request.data)
        if password:
            user.set_password(password)
            user.save()
        context = {"detail": "User updated successfully"}
        return Response(context, status=status.HTTP_200_OK)
    
    def delete(self, request, user_id):
        """Delete user"""
        user = get_user_by_id(user_id)
        if not user:
            context = {
                'detail': 'User not found'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        context = {"detail": "User deleted successfully"}
        return Response(context, status=status.HTTP_200_OK)
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
            context = {"detail": "Your account has already been verified", "status": True}
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationToken.objects.get(email=email)
        if str(otp).strip() == str(otp_detail.token).strip():
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
        context = {
                    "detail": "The otp you have provided is invalid",
                   "status": False
                   }
        return Response(context, status=status.HTTP_400_BAD_REQUEST)

    def list_sales_person(self, request):
        """Retrieve all sales persons"""
        users = get_all_sales_person()
        serializer = AccountUserSerializer(users, many=True)
        return Response(serializer.data)

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