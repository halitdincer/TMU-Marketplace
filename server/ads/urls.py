from django.contrib import admin
from django.urls import path
from .views import AdListView, AdDetailView

urlpatterns = [
    path('', AdListView.as_view(), name='ad-list'),
    path('<int:pk>/', AdDetailView.as_view(), name='ad-detail'),
]
