from django.shortcuts import render
from .models import User, token_expired
from rest_framework import viewsets
from .serializers import UserSerializer

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.authtoken.models import Token

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class ObtainExpiringAuthToken(ObtainAuthToken):
    model = Token

    def post(self, request):
        """
        Works the same as ObtainAuthToken but instead, we
        delete the current user token if it's expired and create
        a new one
        """
        serializer = AuthTokenSerializer(data=request.data)

        if serializer.is_valid():
            token, _ = Token.objects.get_or_create(
                user=serializer.validated_data['user']
            )

            if token_expired(token):
                # Delete and generate a new one
                token.delete()
                token = Token.objects.create(
                    user=serializer.validated_data['user']
                )

            data = {'token': token.key}
            return Response(data)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

obtain_expiring_auth_token = ObtainExpiringAuthToken.as_view()
