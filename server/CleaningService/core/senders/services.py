from core.models import *
from core.serializers import ServiceSerializer
from core.retrievers.services import *
import json



def create_service(user: CleaningServiceUser, data: str)-> dict:
    """create service"""
    serializer = ServiceSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return serializer.data
    else:
        return serializer.errors
    

def update_service(service: Service, data:str) -> dict:
    """ Update a service

    Args:
        data (str):  post data to the with the required serive
        service (Service): Service instance
        Return a serialized dict 
    """
    serializer = ServiceSerializer(instance=service, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return None
    
    
def send_all_services():
    """Get all services from the database
    """
    services_queryset = get_all_service()
    
    
    serializer = ServiceSerializer(services_queryset, many=True)

    return serializer.data
    

def all_profiles():
    """Get all profiles"""
    queryset = CleaningServiceUserProfile.objects.all()
    serializer = CleaningServiceUserProfileSerializer(queryset, many=True)
    return serializer.data