from django.contrib import admin
from django.urls import path, re_path
from .views import AdListView, AdDetailView, createAd, CreateAdView

urlpatterns = [
    path('', AdListView.as_view(), name='ad-list'),
    path('<int:pk>/', AdDetailView.as_view(), name='ad-detail'),
    path('create/', CreateAdView.as_view(), name='create_ad'),
]
