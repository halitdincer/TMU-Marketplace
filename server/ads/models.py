from django.db import models
from users.models import CustomUser

class Ad(models.Model):
    TYPE_CHOICES = [
        ('IW', 'Items Wanted'),
        ('IS', 'Items for Sale'),
        ('AS', 'Academic Services'),
    ]

    CATEGORY_CHOICES = [
        # Items
        ('EL', 'Electronics'),
        ('CL', 'Clothing'),
        ('SP', 'Sports & Outdoors'),
        ('GH', 'Games & Hobbies'),
        ('MU', 'Music & Instruments'),
        ('FA', 'Furniture & Appliances'),
        ('BE', 'Beauty & Personal Care'),
        ('GA', 'Garden'),
        ('TB', 'Textbooks'),
        ('LO', 'Lost & Found'),

        # Services
        ('SG', 'Study Groups'),
        ('TU', 'Tutoring'),
        ('RS', 'Research & Surveys'),

        # Other
        ('OT', 'Others'),
    ]

    LOCATION_CHOICES = [
        ('TE', 'Toronto & East York'),
        ('EB', 'Etobicoke'),
        ('NY', 'North York'),
        ('SC', 'Scarborough'),
        ('VA', 'Vaughan'),
        ('MK', 'Markham'),
        ('RH', 'Richmond Hill'),
        ('MV', 'Mississauga'),
        ('BR', 'Brampton'),
        ('AP', 'Ajax & Pickering'),
        ('OS', 'Whitby & Oshawa'),
        ('OK', 'Oakville & Milton'),
        ('OT', 'Other Locations'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, default='IW')
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES, default='OT')
    location = models.CharField(max_length=2, choices=LOCATION_CHOICES, default='TE')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owned_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='ads')
    image = models.ImageField(upload_to='ad_images/', blank=True, null=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
"""class AdImage(models.Model):
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='ad_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['uploaded_at']

    def __str__(self):
        return f"Ad Image for {self.ad.title} uploaded at {self.uploaded_at}"
"""