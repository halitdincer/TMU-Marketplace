from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
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

class SendMessageView(CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Override the default create method to add the sender automatically
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=request.user)  # Automatically set the sender to the current user
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)