from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework import exceptions
from django.conf import settings
import pytz
from rest_framework.authtoken.models import Token

from token_auth.models import token_expired

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise exceptions.AuthenticationFailed("Invalid token")

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed("User inactive or deleted")

        if token_expired(token):
            raise exceptions.AuthenticationFailed("Token has expired")

        return token.user, token
