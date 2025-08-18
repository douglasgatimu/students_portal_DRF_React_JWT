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
from courses.serializers import CourseSerializer, ModuleSerializer
from courses.permissions import (
    IsEnrolledInCourseForDetail,
    IsEnrolledInModuleForDetail,
)


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsEnrolledInCourseForDetail] 

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        """
        Enroll the requesting user in the course.
        Only allowed if user is already enrolled in the related module.
        """
        course = self.get_object()
        user = request.user

        try:
            module_enrollment = ModuleEnrollment.objects.get(
                student=user,
                module=course.module
            )
        except ModuleEnrollment.DoesNotExist:
            return Response(
                {"detail": "Must be enrolled in module before enrolling in its course."},
                status=status.HTTP_400_BAD_REQUEST
            )

        ce, created = CourseEnrollment.objects.get_or_create(
            phase_enrollment=module_enrollment,
            course=course
        )
        if created:
            return Response(
                {"detail": "Enrolled in course."},
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
        """
        course = self.get_object()
        user = request.user

        ce_qs = CourseEnrollment.objects.filter(
            course=course,
            phase_enrollment__student=user
        )
        if not ce_qs.exists():
            return Response(
                {"detail": "Not enrolled in course."},
                status=status.HTTP_400_BAD_REQUEST
            )
        ce_qs.delete()
        return Response(
            {"detail": "Unenrolled from course."},
            status=status.HTTP_200_OK
        )


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all().annotate(total_courses=Count('courses'))
    serializer_class = ModuleSerializer
    permission_classes = [IsEnrolledInModuleForDetail] 

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
        module = self.get_object()
        user = request.user

        try:
            me = ModuleEnrollment.objects.get(student=user, module=module)
        except ModuleEnrollment.DoesNotExist:
            return Response(
                {"detail": "Not enrolled in module."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Unenroll from module and cascade course unenrollments tied to this ModuleEnrollment
        with transaction.atomic():
            # Delete course enrollments associated with this module enrollment
            CourseEnrollment.objects.filter(phase_enrollment=me).delete()
            me.delete()

        return Response(
            {"detail": "Unenrolled from module and related courses."},
            status=status.HTTP_200_OK
        )
