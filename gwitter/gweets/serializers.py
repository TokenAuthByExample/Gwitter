from gweets.models import Gweet
from rest_framework import serializers
from token_auth.serializers import UserSerializer
from token_auth.models import User

class GweetSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Gweet
        fields = ('id', 'text', 'user', 'username', 'created_on',)
