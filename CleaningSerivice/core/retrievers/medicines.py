from core.models import *
from core.serializers import MedicineSerializer, OrderSerializer

def get_medicine_by_id(id: uuid) -> Medicine:
    """Get medicine by id

    Args:
        id (uuid): provide a valid uuid to get a medicine
        Return: A medicine is it exists else it return none
    """
    try:
        query = Medicine.objects.get(medicine_id=id)
        return query
    except Medicine.DoesNotExist:
        return None
    
def get_serivce_by_user(user: AccountUser) -> Medicine:
    """Get medicine by user

    Args:
        user (CleaningMedicineUser): CleaningMedicineUser instance
        Return: A medicine is it exists else it return none
    """
    try:
        query = Medicine.objects.filter(user=user)
        return MedicineSerializer(query, many=True).data
    except Medicine.DoesNotExist:
        return None
    
    
def get_all_medicine() -> Medicine:
    """Get all medicines
        Return all serice in the db
    """
    query_set = Medicine.objects.all()
    serializer = MedicineSerializer(query_set, many=True)
    return serializer.data


# def get_medicine_of_provider(user: CleaningMedicineUser) -> Medicine:
#     try:
#         query_set = Medicine.objects.filter(user=user)
#         return query_set
#     except Medicine.DoesNotExist:
#         return None
    
    
def get_medicine_by_category(category: str) -> Medicine:
    """Get all the medicine in a particular category

    Args:
        category (string): Get the medicines in a category
        Return: The Medicines in a category if found else return None
    """
    try:
        query_set = Medicine.objects.filter(category=category)
        return query_set
    except Medicine.DoesNotExist:
        return None
    

def get_booked_medicine_by_customer(customer: AccountUser) -> Medicine:
    """Get all booked medicine by a customer

    Args:
        customer (CleaningMedicineUser): CleaningMedicineUser instance
        Return: All booked medicine by a customer
    """
    try:
        query_set = Order.objects.filter(customer=customer)
        return query_set
    except ScheduleMedicine.DoesNotExist:
        return None
    

def get_order_by_id(id: uuid) -> Order:
    """Get ordered medicine by id

    Args:
        id (uuid): provide a valid uuid to get a medicine

    Returns:
        Medicine: A medicine is it exists else it return none
    """
    try:
        query = Order.objects.get(order_id=id)
        return query
    except Order.DoesNotExist:
        return None

def get_ordered_medicine_by_doctor(doctor: AccountUser) -> Order:
    """Get all booked medicine by a provider

    Args:
        provider (CleaningMedicineUser): CleaningMedicineUser instance
        Return: All booked medicine by a provider
    """
    try:
        query_set = Order.objects.filter(medicine__user=doctor)
        return OrderSerializer(query_set, many=True).data
    except Order.DoesNotExist:
        return None
    

def get_all_ordered_medicine_by_doctor(doctor: AccountUser) -> Order:
    """Get all booked medicine by a provider

    Args:
        provider (CleaningMedicineUser): CleaningMedicineUser instance
        Return: All booked medicine by a provider
    """
    try:
        query_set = Order.objects.filter(medicine__doctor=doctor)
        return query_set
    except Order.DoesNotExist:
        return None

def get_all_ordered_medicine() -> Medicine:
    """Get all booked medicine

    Return: All booked medicine
    """
    try:
        query_set = Order.objects.all()
        return query_set
    except Order.DoesNotExist:
        return None
    

def update_ordered_medicine_status(order: Order, status: str) -> Order:
    """Update booked medicine status

    Args:
        medicine (ScheduleMedicine): ScheduleMedicine instance
        status (str): status of the medicine
        Return: Updated booked medicine
    """
    order.status = status
    order.save()
    return order


def get_ordered_medicine_by_id(id: uuid) -> Order:
    """Get booked medicine by id

    Args:
        id (uuid): provide a valid uuid to get a medicine

    Returns:
        Medicine: A medicine is it exists else it return none
    """
    try:
        query = Order.objects.get(order_id=id)
        return query
    except Order.DoesNotExist:
        return None
    
get_all_categories = lambda: Category.objects.all()
get_category_by_id = lambda id: Category.objects.get(id=id)
get_category_by_name = lambda name: Category.objects.get(Name=name)