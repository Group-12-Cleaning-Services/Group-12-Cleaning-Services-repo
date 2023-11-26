from core.models import *
from core.serializers import *

def get_user_information(user):
    """Get user information"""
    # user = get_user_by_email(email)
    serializer = CleaningServiceSerializer(user)
    return serializer.data

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

def get_verification_token(email):
    """Get verification token"""
    try:
        return VerificationToken.objects.get(email=email)
    except VerificationToken.DoesNotExist:
        return None


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
        return CleaningServiceUserProfile.objects.get(user=user)
    except CleaningServiceUser.DoesNotExist:
        return None
    
def get_profile_by_id(profile_id):
    """Get profile by id"""
    try:
        return CleaningServiceUserProfile.objects.get(profile_id=profile_id)
    except CleaningServiceUserProfile.DoesNotExist:
        return None

def all_profiles():
    """Get all profiles"""
    queryset = CleaningServiceUserProfile.objects.all()
    serializer = CleaningServiceUserProfileSerializer(queryset, many=True)
    return serializer.data