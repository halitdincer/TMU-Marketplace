from rest_framework import serializers
from .models import Message
from users.models import CustomUser

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    receiver_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'  # Includes both 'sender_name' and 'receiver_name'

    def get_sender_name(self, obj):
        return obj.sender.username  # Replace 'name' with the actual field name in the User model for the name

    def get_receiver_name(self, obj):
        return obj.receiver.username  # Replace 'name' with the actual field name in the User model for the name