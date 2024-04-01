from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import CustomUser
from django.shortcuts import get_object_or_404

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class CustomUserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# @api_view(['POST'])
# def login(request):
#     user = get_object_or_404(CustomUser, username = request.data['username'])
#     if not user.check_password(request.data['password']):
#         return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
#     token, created = Token.objects.get_or_create(user = user)
#     serializer = CustomUserSerializer(instance = user)
#     return Response({"Authorization": "Token "+token.key, "user": serializer.data})
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = CustomUser.objects.get(username=username)
    except CustomUser.DoesNotExist:
        # User not found, but return a generic 401 status to avoid giving away information
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # Check if the provided password is correct
    if not user.check_password(password):
        # Password is incorrect, return a generic 401 status
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Authentication is successful, create or get the token
    token, created = Token.objects.get_or_create(user=user)
    serializer = CustomUserSerializer(instance=user)
    
    # Return the token and user data
    return Response({"Authorization": "Token " + token.key, "user": serializer.data})


@api_view(['POST'])
def signup(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = CustomUser.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        #create auth token 
        token = Token.objects.create(user = user)
        return Response({"Authorization": "Token "+token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"Message": "Logged out"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")
