from django.db.models.signals import post_save
from django.dispatch import receiver, Signal
from core.models import ScheduleService, Notification

@receiver(post_save, sender=ScheduleService)
def create_schedule_service_notication(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            message=f"Dear {instance.customer.email} {instance.service.title} has successfully being booked",
            user=instance.customer,
        )
        
        Notification.objects.create(
            message=f"Dear {instance.service.user.email} {instance.service.title} has successfully being booked by {instance.customer.email}",
            user=instance.service.user,
        )

        