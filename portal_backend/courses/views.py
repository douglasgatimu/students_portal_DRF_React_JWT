from django.shortcuts import render
from rest_framework import generics, viewsets
from courses.models import Course, Module
from courses.serializers import CourseSerializer, ModuleSerializer
from django.db.models import Count

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all().annotate(total_courses=Count('courses'))
    serializer_class = ModuleSerializer

# class CourseListView(generics.ListAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer

# class CourseDetailView(generics.RetrieveAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer    

