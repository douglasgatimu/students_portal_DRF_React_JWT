from django.contrib.auth.models import Group, User
from rest_framework import serializers
from courses.models import Course, Module

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'module', 'short_description']


class ModuleSerializer(serializers.ModelSerializer):

    total_courses = serializers.IntegerField()
    class Meta:
        model = Module
        fields = ['title', 'created_at', 'total_courses']