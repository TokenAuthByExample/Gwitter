from django.shortcuts import render
from .models import Gweet
from rest_framework import viewsets
from .serializers import GweetSerializer
from rest_framework.permissions import AllowAny

class GweetViewSet(viewsets.ModelViewSet):
    queryset = Gweet.objects.all().order_by('-created_on')
    serializer_class = GweetSerializer

    permission_classes_by_action = { 'list': (AllowAny,),
                                     'retrieve': (AllowAny,)}

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except:
            return [permission() for permission in self.permission_classes]
