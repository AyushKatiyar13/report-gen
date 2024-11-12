from django.contrib import admin 
from django.urls import path,include
from users import views
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'getallusers', views.userAccountsListView)

urlpatterns = [
    path('', include(router.urls)),
    path('',include("djoser.urls")),
    path('',include("djoser.urls.authtoken")),    
    path('token/login1', views.TokenObtainView.as_view(), name='new-token,obtain-view')


]