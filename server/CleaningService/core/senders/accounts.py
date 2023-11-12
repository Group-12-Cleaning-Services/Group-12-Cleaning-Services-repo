from core.models import CleaningServiceUser, VerificationToken, PasswordToken
from django.contrib.auth import get_user_model
import random, string



def create_user(email, password):
    """Create user"""
    user = CleaningServiceUser.objects.create_user(email=email, password=password)
    return user


def create_verification_token(email):
    """Create verification token"""
    token = VerificationToken.objects.create(email=email)
    return token


def generate_token(otp_length):
    """Generate token"""
    return ''.join([random.choice(string.ascii_uppercase + string.digits)] for _ in range(otp_length))