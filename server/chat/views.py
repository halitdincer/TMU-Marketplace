# views.py
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Message
from .serializers import MessageSerializer


class MessageView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        """
        Handles GET requests.
        Returns messages where the current user is either the sender or the receiver.
        """
        user = request.user
        messages = Message.objects.filter(Q(sender=user) | Q(receiver=user)).order_by('-timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests.
        Allows a user to send a message.
        """
        serializer = MessageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
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