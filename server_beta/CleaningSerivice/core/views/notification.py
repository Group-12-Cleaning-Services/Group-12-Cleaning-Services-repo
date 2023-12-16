from rest_framework import viewsets, status
from rest_framework.response import Response
from core.retrievers.notification import *
from core.utils import get_user_from_jwttoken
from rest_framework.permissions import IsAuthenticated

class NotificationViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request):
        """View for getting all service objects

        Args:
            request (http): get request
        """
        user = get_user_from_jwttoken(request)
        context = {
            "detail": "All Notifications",
            "notifications": get_notification_by_user(user)
        }
        return Response(context, status=status.HTTP_200_OK)