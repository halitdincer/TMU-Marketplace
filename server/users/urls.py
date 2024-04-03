
from django.contrib import admin
from django.urls import include, path, re_path
from . import views


urlpatterns = [
    path('', views.CustomUserListView.as_view(), name='user-list'),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
    re_path('logout', views.logout),
    re_path('update-user', views.updateUser),

]