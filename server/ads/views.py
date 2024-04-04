from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Ad
from .serializers import AdSerializer, AdImageSerializer, AdFormSerializer, AdDeleteSerializer
from users.models import CustomUser
from rest_framework.decorators import authentication_classes, permission_classes, parser_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

class AdListView(ListAPIView):
    serializer_class = AdSerializer

    def get_queryset(self):
        queryset = Ad.objects.all()
        category = self.request.query_params.get('category')
        location = self.request.query_params.get('location')
        status = self.request.query_params.get('status')
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if category is not None:
            queryset = queryset.filter(category=category)

        if location is not None:
            queryset = queryset.filter(location=location)

        if status is not None:
            queryset = queryset.filter(status=status)

        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)

        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

class AdDetailView(RetrieveAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

class CreateAdView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AdFormSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            ad = serializer.save(owned_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditAdView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        #user = request.user  #from permission/auth classes
        ad = Ad.objects.get(pk = request.data["pk"])   
        adSerializer = AdFormSerializer(ad, data=request.data, context={'request': request})
        if adSerializer.is_valid():
            adSerializer.save()
            return Response(adSerializer.data, status=status.HTTP_201_CREATED)
        return Response(adSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteAdView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        #user = request.user  #from permission/auth classes
        ad = Ad.objects.get(pk = request.data["pk"])   
        serializer = AdDeleteSerializer(ad, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def createAd(request):
    ad = Ad(owned_by=request.user) #from permission/auth classes
    adSerializer = AdSerializer(ad, data=request.data)
    if adSerializer.is_valid():
        #print(adSerializer)
        adSerializer.save()
        return Response(adSerializer.data, status=status.HTTP_201_CREATED)
    return Response(adSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def editAd(request):
    user = request.user  #from permission/auth classes
    ad = Ad.objects.get(pk = request.data["id"])   
    adSerializer = AdSerializer(ad, data=request.data)
    if adSerializer.is_valid():
        adSerializer.save()
        return Response(adSerializer.data, status=status.HTTP_201_CREATED)
    return Response(adSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""