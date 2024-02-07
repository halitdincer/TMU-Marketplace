from rest_framework import serializers
from .models import Ad

class AdSerializer(serializers.ModelSerializer):
    owned_by = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Ad
        fields = ['id', 'title', 'description', 'category', 'price', 'created_at', 'owned_by']

    def get_owned_by(self, obj):
        return obj.owned_by.username
    
    def get_category(self, obj):
        return dict(Ad.CATEGORY_CHOICES)[obj.category]
