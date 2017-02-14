from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from gweets.models import UserProfile

class User(AbstractUser):
    # ... don't change attributes ...
    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        UserProfile.objects.create(user=self)
