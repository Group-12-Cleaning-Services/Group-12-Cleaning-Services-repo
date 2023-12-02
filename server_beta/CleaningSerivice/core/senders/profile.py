from core.models import *
from core.serializers import *

def create_profile(data):
    """Create profile"""
    serializer = CleaningServiceUserProfileSerializer(data=data, many=False)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return None


def update_profile(data):
    serializer = CleaningServiceUserProfileSerializer(data=data, partial=True, many=False)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return None