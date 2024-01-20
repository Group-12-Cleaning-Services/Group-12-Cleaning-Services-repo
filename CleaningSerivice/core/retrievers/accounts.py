from core.models import CleaningServiceUser, VerificationToken, PasswordToken, CleaningServiceUserProfile
from core.serializers import CleaningServiceSerializer, VerificationTokenSerializer, PasswordTokenSerializer
from core.senders.profile import *


def get_user_information(email):
    """Get user information"""
    user = get_user_by_email(email)
    if user.profile:
        profile = get_profile_by_user_id(user.user_id)
        user_data = {
            "user_id": user.user_id,
            "email": user.email,
            "user_type": user.user_type,
            "organization_name": user.organization_name if user.user_type == "service_provider" else "",
            "organization_logo": str(user.organization_logo) if user.organization_logo and user.user_type == "service_provider" else None,

            "verified": user.verified,
            "profile": send_profile_information(user.profile)
        }
        return user_data
    else:
        user_data = {
            "user_id": user.user_id,
            "email": user.email,
            "user_type": user.user_type,
            "verified": user.verified,
            "profile": "",
            "organization_name": user.organization_name if user.user_type == "service_provider" else "",
            "organization_logo": str(user.organization_logo) if user.organization_logo and user.user_type == "service_provider" else None,

        }
        return user_data
            
            
def get_user_by_email(email):
    """Get user by email"""
    try:
        return CleaningServiceUser.objects.get(email=email)
    except CleaningServiceUser.DoesNotExist:
        return None

def get_user_by_id(user_id):
    """Get user by id"""
    try:
        return CleaningServiceUser.objects.get(user_id=user_id)
    except CleaningServiceUser.DoesNotExist:
        return None


def get_all_users():
    """Get all users"""
    queryset = CleaningServiceUser.objects.all()
    serializer = CleaningServiceSerializer(queryset, many=True)
    return serializer.data

def get_profile_by_user(email):
    """Get profile by user"""
    try:
        user = get_user_by_email(email)
        return CleaningServiceUserProfile.objects.get(user=user)
    except CleaningServiceUser.DoesNotExist:
        return None

def get_profile_by_user_id(user_id):
    """Get profile by user id"""
    try:
        user = get_user_by_id(user_id)
        if user.profile:
            profile_id = user.profile.profile_id
            return CleaningServiceUserProfile.objects.get(profile_id=profile_id)
        else:
            return None
    except:
        return None

def get_verification_token(email):
    """Get verification token"""
    try:
        return VerificationToken.objects.get(email=email)
    except VerificationToken.DoesNotExist:
        return None


def get_password_token(email):
    """Get password token"""
    try:
        return PasswordToken.objects.get(email=email)
    except PasswordToken.DoesNotExist:
        return None

def get_profile_by_id(id):
    try:
        return CleaningServiceUserProfile.objects.get(profile_id=id)
    except CleaningServiceUserProfile.DoesNotExist:
        return None