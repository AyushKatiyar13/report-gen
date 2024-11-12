from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status 
from . models import User
from . serialzers import UserCreateSerializer,userProfileSerializer,MyAuthTokenSerializer
# from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny,IsAdminUser 
from rest_framework import viewsets

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token



class TokenObtainView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        data=request.data
        # if "email" in (request.data.keys()):
        #     item = User.objects.get(email=request.data["email"])
        #     data={"username":item.username,"password":request.data["password"]}   
        serializer = MyAuthTokenSerializer(data=data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        custom_response = {
            'token': token.key,
            'is_staff': user.is_staff,
            "username" :  user.username
        }
        return Response(custom_response)


# Create your views here.
class userAccountsListView(viewsets.ReadOnlyModelViewSet):

    queryset=User.objects.all()
    serializer_class=userProfileSerializer
    permission_classes = [ IsAdminUser ]
    