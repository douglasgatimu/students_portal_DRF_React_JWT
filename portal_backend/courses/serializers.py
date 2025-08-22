from django.contrib.auth.models import Group, User
from rest_framework import serializers
from courses.models import Course, Module

class CourseListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    
    class Meta:
        model = Course
        fields = [
                  'title',
                  'owner',
                  'module',
                  'slug',
                  'short_description',
                  'language',
                  'created_at',
                  'requirements',
                  ]

class CourseDetailSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Course
        fields = [
            "title",
            "owner",
            "module",
            "slug",
            "short_description",
            "description",
            "outcome",
            "requirements",
            "language",
            "level",
            "banner",
            "created_at",
            "updated_at",
        ]

class ModuleSerializer(serializers.ModelSerializer):

    # courses = serializers.StringRelatedField(many=True, read_only=True)
    courses = CourseListSerializer(many=True, read_only=True)
    total_courses = serializers.IntegerField()
    class Meta:
        model = Module
        fields = ['id','title', 'created_at', 'total_courses', 'courses']