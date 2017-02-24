from django.conf.urls import url, include
from rest_framework import routers
from token_auth import views as auth_views
from gweets import views as gweet_views

router = routers.DefaultRouter()
router.register(r'users', auth_views.UserViewSet)
router.register(r'gweets', gweet_views.GweetViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^get_auth_token/$', auth_views.obtain_expiring_auth_token, name='get_auth_token'),
]
