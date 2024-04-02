from django.contrib import admin
from django.urls import path, re_path
from .views import AdListView, AdDetailView, createAd, CreateAdView, editAd

urlpatterns = [
    path('', AdListView.as_view(), name='ad-list'),
    path('<int:pk>/', AdDetailView.as_view(), name='ad-detail'),
    path('create/', CreateAdView.as_view(), name='create_ad'),
    #path('edit/', EditAdView.as_view(), name='edit_ad'),
    #re_path('create-ad', createAd),
    #re_path('edit-ad', editAd),

]
