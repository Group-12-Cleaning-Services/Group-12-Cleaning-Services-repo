from core.models import *
from core.serializers import ServiceSerializer, ScheduleServiceSerializer

def get_service_by_id(id: uuid) -> Service:
    """Get service by id

    Args:
        id (uuid): provide a valid uuid to get a service
        Return: A service is it exists else it return none
    """
    try:
        query = Service.objects.get(service_id=id)
        return query
    except Service.DoesNotExist:
        return None
    
def get_serivce_by_user(user: CleaningServiceUser) -> Service:
    """Get service by user

    Args:
        user (CleaningServiceUser): CleaningServiceUser instance
        Return: A service is it exists else it return none
    """
    try:
        query = Service.objects.filter(user=user)
        return ServiceSerializer(query, many=True).data
    except Service.DoesNotExist:
        return None
    
    
def get_all_service() -> Service:
    """Get all services
        Return all serice in the db
    """
    query_set = Service.objects.all()
    serializer = ServiceSerializer(query_set, many=True)
    return serializer.data


# def get_service_of_provider(user: CleaningServiceUser) -> Service:
#     try:
#         query_set = Service.objects.filter(user=user)
#         return query_set
#     except Service.DoesNotExist:
#         return None
    
    
def get_service_by_category(category: str) -> Service:
    """Get all the service in a particular category

    Args:
        category (string): Get the services in a category
        Return: The Services in a category if found else return None
    """
    try:
        query_set = Service.objects.filter(category=category)
        return query_set
    except Service.DoesNotExist:
        return None
    

def get_booked_service_by_customer(customer: CleaningServiceUser) -> Service:
    """Get all booked service by a customer

    Args:
        customer (CleaningServiceUser): CleaningServiceUser instance
        Return: All booked service by a customer
    """
    try:
        query_set = ScheduleService.objects.filter(customer=customer)
        return query_set
    except ScheduleService.DoesNotExist:
        return None
    

def get_booked_service_by_id(id: uuid) -> Service:
    """Get booked service by id

    Args:
        id (uuid): provide a valid uuid to get a service

    Returns:
        Service: A service is it exists else it return none
    """
    try:
        query = ScheduleService.objects.get(scheduleservice_id=id)
        return query
    except ScheduleService.DoesNotExist:
        return None

def get_booked_service_by_provider(provider: CleaningServiceUser) -> Service:
    """Get all booked service by a provider

    Args:
        provider (CleaningServiceUser): CleaningServiceUser instance
        Return: All booked service by a provider
    """
    try:
        query_set = ScheduleService.objects.filter(service__user=provider)
        return ScheduleServiceSerializer(query_set, many=True).data
    except ScheduleService.DoesNotExist:
        return None
    

def get_all_booked_service_by_provider(provider: CleaningServiceUser) -> Service:
    """Get all booked service by a provider

    Args:
        provider (CleaningServiceUser): CleaningServiceUser instance
        Return: All booked service by a provider
    """
    try:
        query_set = ScheduleService.objects.filter(service__user=provider)
        return query_set
    except ScheduleService.DoesNotExist:
        return None

def get_all_booked_service() -> Service:
    """Get all booked service

    Return: All booked service
    """
    try:
        query_set = ScheduleService.objects.all()
        return query_set
    except ScheduleService.DoesNotExist:
        return None
    

def update_booked_service_status(service: ScheduleService, status: str) -> ScheduleService:
    """Update booked service status

    Args:
        service (ScheduleService): ScheduleService instance
        status (str): status of the service
        Return: Updated booked service
    """
    service.status = status
    service.save()
    return service


def get_booked_service_by_id(id: uuid) -> ScheduleService:
    """Get booked service by id

    Args:
        id (uuid): provide a valid uuid to get a service

    Returns:
        Service: A service is it exists else it return none
    """
    try:
        query = ScheduleService.objects.get(scheduleservice_id=id)
        return query
    except ScheduleService.DoesNotExist:
        return None