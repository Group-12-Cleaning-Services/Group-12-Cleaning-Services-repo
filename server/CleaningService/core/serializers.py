from core.models import CleaningServiceUser, VerificationToken, PasswordToken
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