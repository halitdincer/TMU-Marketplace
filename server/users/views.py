from rest_framework.generics import ListAPIView
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer