from core.models import *
from rest_framework import serializers

class CleaningServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CleaningServiceUser
        fields = ( 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}, 'is_active': {'read_only': True}, 'is_staff': {'read_only': True}, 'is_superuser': {'read_only': True}}
        
        
        
class VerificationTokenSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class PasswordTokenSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        

class CleaningServiceUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CleaningServiceUserProfile
        fields = "__all__"
        extra_kwargs = {'user': {'read_only': True}}


class ServiceSerializer(serializers.ModelSerializer):
    
    user = CleaningServiceSerializer
    class Meta:
        model = Service
        fields = "__all__"
        extra_kwargs = {'service_id': {'read_only': True},
        'user': {'read_only': True}}
        
class ScheduleServiceSerializer(serializers.ModelSerializer):
    """Schedule Service Serializer

    Args:
        serializers (dict): model serializer for schedule service
    """
    service = ServiceSerializer(many=False, read_only=True)
    customer = CleaningServiceSerializer(many=False, read_only=True)
    class Meta:
        model = ScheduleService
        fields = "service", "customer", "time", "status"


class ServiceFeedbackSerializer(serializers.ModelSerializer):
    """Service Feedback Serializer"""

    service_id = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), write_only=True, source='service')

    service = ServiceSerializer(many=False, read_only=True)

    class Meta:
        model = ServiceFeedback
        fields = "service", "rating", "review", "customer"

    def create(self, validated_data):
        service_instance = validated_data.pop('service')

        feedback_instance = ServiceFeedback.objects.create(service=service_instance, **validated_data)

        return feedback_instance
