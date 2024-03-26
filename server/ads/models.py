from django.db import models
from users.models import CustomUser

class Ad(models.Model):
    CATEGORY_CHOICES = [
        ('IW', 'Items Wanted'),
        ('IS', 'Items for Sale'),
        ('AS', 'Academic Services'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owned_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='ads')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
class AdImage(models.Model):
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='ad_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']

    def __str__(self):
        return f"Ad Image for {self.ad.title} uploaded at {self.uploaded_at}"