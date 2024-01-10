from core.models import Notification
from core.serializers import NotificationSerializer

def get_notification_by_user(user):
    try:
        queryset = Notification.objects.filter(user=user)
        serializer = NotificationSerializer(queryset, many=True)
        return serializer.data
    except:
        return None