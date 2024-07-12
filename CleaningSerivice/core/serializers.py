from core.models import *
from rest_framework import serializers



class CleaningServiceUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CleaningServiceUserProfile
        fields = ['profile_id', 'first_name', 'last_name', 'contact', 'profile_image', 'time_created']


class AccountUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ['user_id', 'email', 'organization_name', 'password']
        extra_kwargs = {'password': {'write_only': True}, 'is_active': {'read_only': True}, 'is_staff': {'read_only': True}, 'is_superuser': {'read_only': True},}
        
        
        
class VerificationTokenSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class PasswordTokenSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        


class MedicineSerializer(serializers.ModelSerializer):
    """Medicine Serializer"""
    docter = AccountUserSerializer()
    class Meta:
        model = Medicine
        fields = ['medicine_id', 'name', 'category', 'price', 'quantity', 'description', 'time_created', 'time_updated', 'docter']

class CategorySerializer(serializers.ModelSerializer):
    """Category Serializer"""
    class Meta:
        model = Category
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    """Order Serializer"""
    medicine = MedicineSerializer()
    customer = AccountUserSerializer()
    class Meta:
        model = Order
        fields = ['order_id', 'medicine', 'quantity', 'status', 'customer']



class TransactionSerializer(serializers.ModelSerializer):
    """Transaction Serializer"""

    class Meta:
        model = Transaction
        fields = "__all__"
        extra_kwargs = {
            'balance': {
            'min_value':0.00,
        }}
        
class NotificationSerializer(serializers.ModelSerializer):
    """Notification Serializer"""
    user = AccountUserSerializer()
    class Meta:
        model = Notification
        fields = "__all__"
        extra_kwargs = {
            'read': {
            'default':False,
        }}