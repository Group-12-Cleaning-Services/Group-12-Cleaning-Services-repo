from core.models import *
from core.serializers import ServiceSerializer, ScheduleServiceSerializer, ServiceFeedbackSerialiazer
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


def send_all_services_by_category(category: str):
    """Get all services by category

    Args:
        category (str): category of the service
    """
    services_queryset = get_service_by_category(category)
    serializer = ServiceSerializer(services_queryset, many=True)
    return serializer.data


def book_service(service: Service, user: CleaningServiceUser, time: str) -> dict:
    """Book a service

    Args:
        service (Service): Service instance
        user (CleaningServiceUser): CleaningServiceUser instance
        data (str): post data with required fields
    """
    service = ScheduleService.objects.create(service=service, customer=user, time=time)
    serializer = ScheduleServiceSerializer(service)
    return serializer.data
    
    
def send_all_booked_service() -> dict:
    """Get all booked service

    Return: All booked service
    """
    booked_service_queryset = get_all_booked_service()
    serializer = ScheduleServiceSerializer(booked_service_queryset, many=True)
    return serializer.data


def send_booked_service_by_customer(customer: CleaningServiceUser) -> dict:
    """Get all booked service by a customer

    Args:
        customer (CleaningServiceUser): CleaningServiceUser instance
        Return: All booked service by a customer
    """
    booked_service_queryset = get_booked_service_by_customer(customer)
    serializer = ScheduleServiceSerializer(booked_service_queryset, many=True)
    return serializer.data


def send_booked_service_by_provider(provider: CleaningServiceUser) -> dict:
    """Get all booked service by a provider

    Args:
        provider (CleaningServiceUser): CleaningServiceUser instance
        Return: All booked service by a provider
    """
    booked_service_queryset = get_booked_service_by_provider(provider)
    serializer = ScheduleServiceSerializer(booked_service_queryset, many=True)
    return serializer.data

def create_feedback(review: str, service:ScheduleService, rating:str) -> dict:
    """Create feedback

    Args:
        data (str): post data with required fields
    """
    service_feedback = ServiceFeedback.objects.create(service=service, rating=rating, review=review)
    serializer = ServiceFeedbackSerialiazer(service_feedback)
    return serializer.data

def all_profiles():
    """Get all profiles"""
    queryset = CleaningServiceUserProfile.objects.all()
    serializer = CleaningServiceUserProfileSerializer(queryset, many=True)
    return serializer.data