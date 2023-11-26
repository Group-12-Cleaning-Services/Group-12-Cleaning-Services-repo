from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
import uuid
from phone_field import PhoneField





CATEGORY = [
    ("car_wash", "Car Wash"),
    ("laundary", "Laundary"),
    ("home_cleaning", "Home Cleanin")
]

USER_TYPE = [
    ("customer", "Customer"),
    ("service_provider", "Service Provider")
]

class CleaningServiceUserProfile(models.Model):
    """Cleaning Service User Profile Model"""
    profile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    contact = PhoneField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_images', blank=True, null=True)
    time_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def __str__(self):
        return self.first_name + " " + self.last_name


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
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)   
        return user     
        

class CleaningServiceUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.OneToOneField(CleaningServiceUserProfile, on_delete=models.CASCADE, related_name='profile', null=True, blank=True)
    email = models.EmailField(unique=True)
    user_type = models.CharField(choices=USER_TYPE, max_length=50, default=None, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    objects = CleaningServiceBaseUser()
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser
    
    def __str__(self):
        return self.email
    

    
    
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
    
    
class Service(models.Model):
    service_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CleaningServiceUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.CharField(choices=CATEGORY, max_length=50)
    thumnail = models.ImageField(upload_to="thumnail_images", blank=True, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    
    def __str__(self):
        return f"{self.title} - {self.service} || {self.user.email} at {self.price}"