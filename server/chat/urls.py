from django.urls import path
from .views import MessageView, SentMessageListView, ReceivedMessageListView

urlpatterns = [
    path('', MessageView.as_view(), name='message-list'),
    path('sent', SentMessageListView.as_view(), name='sent-message-list'),
    path('received', ReceivedMessageListView.as_view(), name='received-message-list'),
]