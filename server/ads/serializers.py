from rest_framework import serializers
from .models import Ad#, AdImage

"""class AdImageSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(source='image', read_only=True)

    class Meta:
        model = AdImage
        fields = ['image_url', 'uploaded_at']
"""
class AdSerializer(serializers.ModelSerializer):
    owned_by = serializers.SerializerMethodField()
    #category = serializers.SerializerMethodField()
    #images = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    
    class Meta:
        model = Ad
        fields = ['id', 'title', 'description', 'category', 'type', 'location', 'price', 'created_at', 'owned_by', 'image']

    def get_owned_by(self, obj):
        return obj.owned_by.username
    
    def get_category(self, obj):
        return dict(Ad.CATEGORY_CHOICES)[obj.category]
    
    def get_type(self, obj):
        return dict(Ad.TYPE_CHOICES)[obj.type]
    
    def get_location(self, obj):
        return dict(Ad.LOCATION_CHOICES)[obj.location]
    
    """def get_images(self, obj):
        images = obj.images.all()
        return AdImageSerializer(images, many=True, context=self.context).data
    """
