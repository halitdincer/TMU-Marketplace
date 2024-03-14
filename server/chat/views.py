# views.py
from rest_framework.generics import ListAPIView
from .models import Message
from .serializers import MessageSerializer

class MessageListView(ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned messages to a given user,
        by filtering against a `sender_id` and `receiver_id` query parameter in the URL.
        """
        queryset = Message.objects.all()
        sender_id = self.request.query_params.get('sender_id')
        receiver_id = self.request.query_params.get('receiver_id')
        if sender_id is not None:
            queryset = queryset.filter(sender_id=sender_id)
        if receiver_id is not None:
            queryset = queryset.filter(receiver_id=receiver_id)
        return queryset