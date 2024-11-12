from django.contrib import admin 
from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'data', views.report)

router1 = routers.DefaultRouter()
router1.register(r'data', views.regions)

router3=routers.DefaultRouter()
router3.register(r'getallreports', views.getallreports)


# router2 = routers.DefaultRouter()
# router2.register(r'data', views.countrys)

# router4= routers.DefaultRouter()
# router4.register(r'downedit', views.downedit)


# urlpatterns = [
#     path('api/reportgen/',views.repo,name='reportgen'),
# ]
urlpatterns = [
    path('', include(router.urls)),
    path('region/', include(router1.urls)),
    # path('country/', include(router2.urls)),
    path('', include(router3.urls)),
    # path('', include(router4.urls)),
    path('repo/', views.downedit.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
