from core.models import Service
from core.serializers import ServiceSerializer

def create_service(user, data):
    """create service"""
    if user.user_type == "service_provider":
        serializer = ServiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)
            return serializer.data
        else:
            return serializer.errors
    else:
        return None