from rest_framework import serializers
from .models import Message
from users.models import CustomUser
from rest_framework.exceptions import ValidationError

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    receiver_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'  # Includes both 'sender_name' and 'receiver_name'
        read_only_fields = ['sender']

    def get_sender_name(self, obj):
        return obj.sender.username  # Replace 'name' with the actual field name in the User model for the name

    def get_receiver_name(self, obj):
        return obj.receiver.username  # Replace 'name' with the actual field name in the User model for the name
    
    def validate(self, attrs):
        if attrs['receiver'] == self.context['request'].user:
            raise ValidationError("You cannot send a message to yourself.")
        return attrs

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)