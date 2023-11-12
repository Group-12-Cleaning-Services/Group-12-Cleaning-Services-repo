from core.models import CleaningServiceUser, VerificationToken, PasswordToken
from core.serializers import CleaningServiceSerializer, VerificationTokenSerializer, PasswordTokenSerializer


def get_user_information(email):
    """Get user information"""
    user = get_user_by_email(email)
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


