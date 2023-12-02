from django.contrib import admin
from core.models import *
# Register your models here.
admin.site.register(CleaningServiceUser)
admin.site.register(VerificationToken)
admin.site.register(PasswordToken)
admin.site.register(CleaningServiceUserProfile)
admin.site.register(Service)
admin.site.register(ScheduleService)