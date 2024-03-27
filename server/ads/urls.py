from django.contrib import admin
from django.urls import path, re_path
from .views import AdListView, AdDetailView, createAd

urlpatterns = [
    path('', AdListView.as_view(), name='ad-list'),
    path('<int:pk>/', AdDetailView.as_view(), name='ad-detail'),
    re_path('create-ad', createAd),
    
]
