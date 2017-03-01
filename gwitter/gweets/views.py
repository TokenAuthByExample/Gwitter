from django.shortcuts import render
from .models import Gweet
from rest_framework import viewsets, status
from .serializers import GweetSerializer
from token_auth.models import User
from rest_framework.response import Response
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

    def create(self, request):
        serializer = GweetSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'status', 'done'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
