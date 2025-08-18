from rest_framework import permissions
from courses.models import CourseEnrollment, ModuleEnrollment


class IsEnrolledInCourseForDetail(permissions.BasePermission):
    """
    Allows access to course detail only if the user is enrolled in that course.
    Listing courses is allowed to anyone.
    """

    def has_permission(self, request, view):
        if view.action in ('list',):
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            user = request.user
            return CourseEnrollment.objects.filter(
                course=obj,
                phase_enrollment__student=user
            ).exists()
        return True


class IsEnrolledInModuleForDetail(permissions.BasePermission):
    """
    Allows access to module detail only if the user is enrolled in that module.
    Listing modules is allowed to anyone.
    """

    def has_permission(self, request, view):
        if view.action in ('list',):
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            user = request.user
            return ModuleEnrollment.objects.filter(
                module=obj,
                student=user
            ).exists()
        return True
