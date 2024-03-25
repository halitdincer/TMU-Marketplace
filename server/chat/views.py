# views.py
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.db.models import Q
from .models import Message
from .serializers import MessageSerializer


class MessageListView(ListAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns messages where the current user is either the sender or receiver.
        """
        user = self.request.user
        return Message.objects.filter(Q(sender=user) | Q(receiver=user)).order_by('-timestamp')
    
class SentMessageListView(ListAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns messages sent by the current user.
        """
        user = self.request.user
        return Message.objects.filter(sender=user).order_by('-timestamp')
    
class ReceivedMessageListView(ListAPIView):
    serializer_class = MessageSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns messages received by the current user.
        """
        user = self.request.user
        return Message.objects.filter(receiver=user).order_by('-timestamp')