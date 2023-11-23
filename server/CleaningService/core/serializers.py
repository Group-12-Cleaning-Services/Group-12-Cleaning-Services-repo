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
    class Meta:
        model = Service
        fields = "__all__"
        extra_kwargs = {'service_id': {'read_only': True}}