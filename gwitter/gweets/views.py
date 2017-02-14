from django.shortcuts import render
from .models import Gweet
from rest_framework import viewsets
from .serializers import GweetSerializer

class GweetViewSet(viewsets.ModelViewSet):
    queryset = Gweet.objects.all().order_by('-created_on')
    serializer_class = GweetSerializer
