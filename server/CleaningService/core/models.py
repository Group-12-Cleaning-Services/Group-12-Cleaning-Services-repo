from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
import uuid

class CleaningServiceBaseUser(BaseUserManager):
    """Cleaning Service Base User Model"""
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        user = self.model(
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        user = self.model(
            email = self.normalize_email(email),
        )
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        self.create_user(email, password, **extra_fields)
        

class CleaningServiceUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    models.PhoneNumberField(null=True, blank=True, default=None)
    USERNAME_FIELD = 'email'
    objects = CleaningServiceBaseUser()
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser
    
    def __str__(self):
        return self.email
    

class CleaningServiceUserProfile(models.Model):
    user = models.OneToOneField(CleaningServiceUser, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.ImageField(upload_to='profile_images', blank=True, null=True)
    
    def __str__(self):
        return user.first_name if user.first_name  else self.user.email
    
    
class VerificationToken(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=50)
    time = models.DateTimeField()
    
    def __str__(self):
        return f"{self.email} - {self.token}"
    

class PasswordToken(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=50)
    time = models.DateTimeField()
    
    def __str__(self):
        return f"{self.email} - {self.token}"