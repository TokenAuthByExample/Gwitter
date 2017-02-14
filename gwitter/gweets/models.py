from __future__ import unicode_literals
from django.db import models
from django.conf import settings

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="userprofile")
    follows = models.ManyToManyField('UserProfile', related_name="followed_by")

    def __unicode__(self):
        return self.user.username

class Gweet(models.Model):
    text = models.CharField(max_length=140)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="gweets")
    created_on = models.DateTimeField(auto_now=True)
