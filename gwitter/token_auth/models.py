from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from gweets.models import UserProfile

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from rest_framework.authtoken.models import Token
import pytz
import datetime

class User(AbstractUser):
    pass

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        # Create a UserProfile for this user
        UserProfile.objects.create(user=self)
        # Create a Token for this new user
        Token.objects.create(user=instance)


# ./manage.py makemigrations
# ./manage.py migrate
# >>> from token_auth.models import create_tokens
# >>> create_tokens()
# tim 80a2e4b4935e06ac31ab01df74d0b2c9e5f6e518
# chris 68a853f451087a46b1231132d364388eb04e9d4d
# kate 313c821f306bd7467bce1ac9163c636a22c9cea0
#
# curl -X POST http://localhost:8000/get_auth_token/ -d '{ "username": "chris", "password": "chris" }' -H "Content-Type: application/json"
# {"token":"68a853f451087a46b1231132d364388eb04e9d4d"}
def create_tokens():
    users = User.objects.all()
    for user in users:
        token, created = Token.objects.get_or_create(user=user)
        print user.username, token.key

def token_expired(token):
    utc_now = datetime.datetime.utcnow()
    utc_now = utc_now.replace(tzinfo=pytz.utc)

    if token.created < utc_now - settings.TOKEN_EXPIRE_TIME:
        return True
    else:
        return False
