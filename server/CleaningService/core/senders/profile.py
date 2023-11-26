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


def update_profile(data, profile):
    serializer = CleaningServiceUserProfileSerializer(data=data, instance=profile, partial=True)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return None