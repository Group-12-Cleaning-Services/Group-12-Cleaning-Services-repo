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
    doctor = AccountUserSerializer()
    class Meta:
        model = Medicine
        fields = ['medicine_id', 'name', 'category', 'price', 'quantity', 'description', 'doctor']
        
    def create(self, validated_data):
        doctor_data = validated_data.pop('doctor')
        doctor = AccountUser.objects.create(**doctor_data)
        medicine = Medicine.objects.create(doctor=doctor, **validated_data)
        return medicine

    def update(self, instance, validated_data):
        doctor_data = validated_data.pop('doctor')
        doctor = instance.doctor

        instance.medicine_id = validated_data.get('medicine_id', instance.medicine_id)
        instance.name = validated_data.get('name', instance.name)
        instance.category = validated_data.get('category', instance.category)
        instance.price = validated_data.get('price', instance.price)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        doctor.username = doctor_data.get('username', doctor.username)
        doctor.email = doctor_data.get('email', doctor.email)
        doctor.save()

        return instance


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