from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Ad
from .serializers import AdSerializer

class AdListView(ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

class AdDetailView(RetrieveAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer