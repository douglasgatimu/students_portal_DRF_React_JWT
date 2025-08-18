# accounts/views.py

from django.contrib.auth.models import User
from django.contrib.auth import login as django_login, logout as django_logout
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication

from accounts.serializers import (
    UserSerializer,

)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    read-only list/retrieve plus custom auth actions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer