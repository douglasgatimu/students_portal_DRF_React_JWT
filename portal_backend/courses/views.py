from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db import transaction
from django.db.models import Count

from courses.models import (
    Course,
    Module,
    ModuleEnrollment,
    CourseEnrollment,
)
from courses.serializers import CourseListSerializer, CourseDetailSerializer, ModuleSerializer
from courses.permissions import (
    IsEnrolledInCourseForDetail,
    IsEnrolledInModuleForDetail,
)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        """
        Enroll the requesting user in the course.
        Auto-enrolls user in the related module if not already enrolled.
        """
        course = self.get_object()
        user = request.user

        module_enrollment, _ = ModuleEnrollment.objects.get_or_create(
            student=user,
            module=course.module
        )

        ce, created = CourseEnrollment.objects.get_or_create(
            phase_enrollment=module_enrollment,
            course=course
        )
        if created:
            return Response(
                {"detail": "Enrolled in course (and module if not already)."},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {"detail": "Already enrolled in course."},
                status=status.HTTP_200_OK
            )


    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unenroll(self, request, pk=None):
        """
        Unenroll the requesting user from the course.
        Auto-unenrolls from the module if no other courses remain in it.
        """
        course = self.get_object()
        user = request.user

        try:
            ce = CourseEnrollment.objects.get(
                course=course,
                phase_enrollment__student=user
            )
        except CourseEnrollment.DoesNotExist:
            return Response(
                {"detail": "Not enrolled in course."},
                status=status.HTTP_400_BAD_REQUEST
            )

        module_enrollment = ce.phase_enrollment

        with transaction.atomic():
            ce.delete()

            if not CourseEnrollment.objects.filter(phase_enrollment=module_enrollment).exists():
                module_enrollment.delete()
                return Response(
                    {"detail": "Unenrolled from course and module."},
                    status=status.HTTP_200_OK
                )

        return Response(
            {"detail": "Unenrolled from course."},
            status=status.HTTP_200_OK
        )



class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all().annotate(total_courses=Count('courses'))
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated] 

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        module = self.get_object()
        user = request.user
        me, created = ModuleEnrollment.objects.get_or_create(
            student=user,
            module=module
        )
        if created:
            return Response(
                {"detail": "Enrolled in module."},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {"detail": "Already enrolled in module."},
                status=status.HTTP_200_OK
            )

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unenroll(self, request, pk=None):
        """
        Unenroll the requesting user from the module.
        Also unenrolls from all related courses.
        Safe to call even if already unenrolled.
        """
        module = self.get_object()
        user = request.user

        try:
            me = ModuleEnrollment.objects.get(student=user, module=module)
        except ModuleEnrollment.DoesNotExist:
            
            return Response(
                {"detail": "Already not enrolled in module."},
                status=status.HTTP_200_OK
            )

        with transaction.atomic():
            
            CourseEnrollment.objects.filter(phase_enrollment=me).delete()
            me.delete()

        return Response(
            {"detail": "Unenrolled from module and related courses."},
            status=status.HTTP_200_OK
        )

