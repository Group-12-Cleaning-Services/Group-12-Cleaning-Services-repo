from core.models import *

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
    
    
def get_all_service() -> Service:
    """Get all services
        Return all serice in the db
    """
    query_set = Service.objects.all()
    return query_set


def get_service_of_provider(user: CleaningServiceUser) -> Service:
    try:
        query_set = Service.objects.filter(user=user)
        return query_set
    except Service.DoesNotExist:
        return None
    
    
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