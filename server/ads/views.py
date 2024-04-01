from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Ad
from .serializers import AdSerializer, AdImageSerializer
from users.models import CustomUser


class AdListView(ListAPIView):
    serializer_class = AdSerializer

    def get_queryset(self):
        queryset = Ad.objects.all()
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if category is not None:
            queryset = queryset.filter(category=category)

        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)

        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

class AdDetailView(RetrieveAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

@api_view(['POST'])
def createAd(request):
    #authenticate user later
    user = CustomUser.objects.get(username = "mike") #primary key = 1 for the first user (just for now)
    ad = Ad(owned_by=user) 
    image = request.data['images']
    print(image)
    print(request.data)
    adSerializer = AdSerializer(ad, data=request.data)
    #imageSerializer = AdImageSerializer(ad, data=image)
    if adSerializer.is_valid():
        print(adSerializer)
        adSerializer.save()
        return Response(adSerializer.data, status=status.HTTP_201_CREATED)
    return Response(adSerializer.errors, status=status.HTTP_400_BAD_REQUEST)