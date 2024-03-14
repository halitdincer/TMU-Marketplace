from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/ads/', include('ads.urls')),
    path('admin/', admin.site.urls),
    path('', include('public.urls')),
]
