from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from gweets.models import UserProfile

from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from rest_framework.authtoken.models import Token

class User(AbstractUser):
    pass
