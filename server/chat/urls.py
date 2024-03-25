from django.urls import path
from .views import MessageListView, SentMessageListView, ReceivedMessageListView

urlpatterns = [
    path('', MessageListView.as_view(), name='message-list'),
    path('sent', SentMessageListView.as_view(), name='sent-message-list'),
    path('received', ReceivedMessageListView.as_view(), name='received-message-list'),
]