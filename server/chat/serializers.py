from rest_framework import serializers
from .models import Message
from users.models import CustomUser

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    receiver_name = serializers.SerializerMethodField()
    receiver_profile_picture = serializers.SerializerMethodField()
    sender_profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

    def get_sender_name(self, obj):
        return obj.sender.username

    def get_receiver_name(self, obj):
        return obj.receiver.username

    def get_receiver_profile_picture(self, obj):
        if obj.receiver.profile_picture and hasattr(obj.receiver.profile_picture, 'url'):
            return obj.receiver.profile_picture.url
        return None
    
    def get_sender_profile_picture(self, obj):
        if obj.sender.profile_picture and hasattr(obj.sender.profile_picture, 'url'):
            return obj.sender.profile_picture.url
        return None