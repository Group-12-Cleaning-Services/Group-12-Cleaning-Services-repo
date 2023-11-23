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


class AccountViewset(viewsets.ViewSet):
    """Accounts viewset"""
    
    def create(self, request):
        """Create user"""
        email = request.data.get('email')
        password = request.data.get('password')
        user = get_user_by_email(email)
        if user:
            context = {
                'detail': 'User already exists'
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        user = create_user(email, password)
        context = {"detail": "User created successfully", "user": get_user_information(user)}
        thread = threading.Thread(target=email_verification, args=[email, 6])
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
            context = {"detail": "Your account has already been verified"}
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationToken.objects.get(email=email)
        if otp == otp_detail.token:
            if UTC.localize(datetime.now()) < otp_detail.time + timedelta(
                minutes=10
            ):
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
                }

                return Response(context, status=status.HTTP_200_OK)

        else:
            otp_detail.delete()
            context = {"detail": "This otp has expired Request a new one"}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        context = {"detail": "The otp you have provided is invalid"}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)
