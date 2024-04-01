from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Message
from .serializers import MessageSerializer
from django.db.models import Q


class MessageListView(ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        """
        Restricts the returned messages to those where the authenticated user
        is either the sender or the receiver.
        """
        user = self.request.user
        return Message.objects.filter(Q(sender=user) | Q(receiver=user))
