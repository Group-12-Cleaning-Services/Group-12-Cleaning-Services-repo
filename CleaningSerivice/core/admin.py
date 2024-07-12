from django.contrib import admin
from core.models import *
# Register your models here.
admin.site.register(AccountUser)
admin.site.register(VerificationToken)
admin.site.register(PasswordToken)
admin.site.register(Order)
admin.site.register(Category)
admin.site.register(Medicine)
# admin.site.register(ServiceFeedback)
# admin.site.register(Notification)
# admin.site.register(Transaction)