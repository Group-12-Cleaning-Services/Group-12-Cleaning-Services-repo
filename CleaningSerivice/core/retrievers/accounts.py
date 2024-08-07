from core.models import *
from core.serializers import *
from core.senders.profile import *


def get_user_information(email):
    """Get user information"""
    user = get_user_by_email(email)
    # if user.profile:
    #     profile = get_profile_by_user_id(user.user_id)
    #     user_data = {
    #         "user_id": user.user_id,
    #         "email": user.email,
    #         "user_type": user.user_type,
    #         "organization_name": user.organization_name if user.user_type == "service_provider" else "",
    #         "organization_logo": str(user.organization_logo) if user.organization_logo and user.user_type == "service_provider" else None,

    #         "verified": user.verified,
    #         "profile": send_profile_information(user.profile)
    #     }
    #     return user_data
    # else:
    user_data = {
        "user_id": user.user_id,
        "email": user.email,
        "verified": user.verified,
        "is_admin": user.is_superuser,
        "role": user.role,
        "user_image": str(user.user_image) if user.user_image else None,
        'full_name': user.full_name,
    }
    return user_data
            
            
def get_user_by_email(email):
    """Get user by email"""
    try:
        return AccountUser.objects.get(email=email)
    except AccountUser.DoesNotExist:
        return None

def get_user_by_id(user_id):
    """Get user by id"""
    try:
        return AccountUser.objects.get(user_id=user_id)
    except AccountUser.DoesNotExist:
        return None


def get_all_users():
    """Get all users"""
    queryset = AccountUser.objects.all()
    return queryset

def get_profile_by_user(email):
    """Get profile by user"""
    try:
        user = get_user_by_email(email)
        return AccountUserProfile.objects.get(user=user)
    except AccountUser.DoesNotExist:
        return None

def get_profile_by_user_id(user_id):
    """Get profile by user id"""
    try:
        user = get_user_by_id(user_id)
        if user.profile:
            profile_id = user.profile.profile_id
            return AccountUserProfile.objects.get(profile_id=profile_id)
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
        return AccountUserProfile.objects.get(profile_id=id)
    except AccountUserProfile.DoesNotExist:
        return None
    
def get_all_sales_person():
    """Get all sales person"""
    queryset = AccountUser.objects.filter(role='sales_person')
    return queryset