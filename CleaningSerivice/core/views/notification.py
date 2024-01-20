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

        send_data = [
            {
                "message": data["message"]
            } for data in get_notification_by_user(user)
        ]
        context = {
            "detail": "All Notifications",
            "notifications": send_data,
        }
        return Response(context, status=status.HTTP_200_OK)
    
    
    def delete(self, request):
        """View for deleting all service objects

        Args:
            request (http): delete request
        """
        user = get_user_from_jwttoken(request)
        delele_notification_by_user(user)
        context = {
            "detail": "All Notifications Deleted",
        }
        return Response(context, status=status.HTTP_200_OK)