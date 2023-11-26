import random, string
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from core.senders.accounts import *
from core.retrievers.accounts import *
from core.models import *
from datetime import datetime
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpRequest


def generate_otp(otp_length):
    """
    Generate a one time pin with specified length
    """

    return "".join([random.choice(string.digits) for i in range(otp_length)])


def email_verification(email: str, otp_length: int):
    """
    Send email verification code to new user
    """

    subject = "Clean Email Verification Code"
    pin = generate_otp(otp_length)
    print(f"{pin}")

    sender = ""
    receiver = [email]
    html_content = render_to_string(
        "core/verification_email.html",
        {"pin": pin, "receiver": email},
    )
    text_content = strip_tags(html_content)
    email_obj = EmailMultiAlternatives(subject, text_content, sender, receiver)
    email_obj.attach_alternative(html_content, "text/html")

    if email_obj.send():
        token = get_verification_token(receiver)
        if token:
            update_verification_token(token, pin)
        else:
            print(f"receiver: {receiver}")
            pin_created = create_verification_token(receiver[0], pin)
            print(f"pin created: {pin_created}")
        return True
    return False


def verification_confirmation_email(email):
    """
    Confirm email address verification
    """
    subject = "Clean Email Address Verification Confirmation"

    sender = ""
    receiver = [email]

    html_content = render_to_string(
        "core/verification_confirmation.html",
        {"receiver": receiver},
    )
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(subject, text_content, sender, receiver)
    email.attach_alternative(html_content, "text/html")

    if email.send():
        return True
    return False


def password_cofirmation_email(email, otp_length):
    """
    Confirm password reset
    """
    subject = "Clean Password Reset Confirmation"
    pin = generate_otp(otp_length)
    sender = ""
    receiver = [email]
    html_content = render_to_string(
        "core/verification_email.html",
        {"pin": pin, "receiver": email},
    )
    text_content = strip_tags(html_content)
    email_obj = EmailMultiAlternatives(subject, text_content, sender, receiver)
    email_obj.attach_alternative(html_content, "text/html")

    if email_obj.send():
        token = get_password_reset_token(receiver)
        if token:
            update_password_token(token, pin)
        else:
            print(f"receiver: {receiver}")
            pin_created = create_password_token(receiver[0], pin)
            print(f"pin created: {pin_created}")
        return True
    return False



def get_user_from_jwttoken(request: HttpRequest):
    "Return a user object when a valid jwt token is set in the request header"
    jwt = JWTAuthentication()
    user = jwt.get_user(
        jwt.get_validated_token((jwt.get_raw_token(jwt.get_header(request))))
    )
    return user
