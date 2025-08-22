from django.contrib.auth.models import Group, User
from rest_framework import serializers
from courses.models import Course, Module, CourseEnrollment


class CourseListSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_enrolled = serializers.SerializerMethodField()
    student_count = serializers.SerializerMethodField()
    module = serializers.ReadOnlyField(source="module.title")
    
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
                  'is_enrolled',
                  'student_count'
                  ]
    def get_is_enrolled(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return False
        return CourseEnrollment.objects.filter(
            course=obj,
            phase_enrollment__student=user
        ).exists()    

    def get_student_count(self, obj):
        return CourseEnrollment.objects.filter(course=obj).count()        

class CourseDetailSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_enrolled = serializers.SerializerMethodField()
    module = serializers.ReadOnlyField(source="module.title")


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
            'is_enrolled'
        ]
    def get_is_enrolled(self, obj):
        user = self.context["request"].user
        if user.is_anonymous:
            return False
        return CourseEnrollment.objects.filter(
            course=obj,
            phase_enrollment__student=user
        ).exists()         

class ModuleSerializer(serializers.ModelSerializer):

    # courses = serializers.StringRelatedField(many=True, read_only=True)
    courses = CourseListSerializer(many=True, read_only=True)
    total_courses = serializers.IntegerField()
    class Meta:
        model = Module
        fields = ['id','title', 'created_at', 'total_courses', 'courses']