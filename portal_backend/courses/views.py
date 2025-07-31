from django.shortcuts import render
from rest_framework import generics, viewsets
from courses.models import Course, Module
from courses.serializers import CourseSerializer, ModuleSerializer
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all().annotate(total_courses=Count('courses'))
    serializer_class = ModuleSerializer

# class CourseListView(generics.ListAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer

# class CourseDetailView(generics.RetrieveAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer    

