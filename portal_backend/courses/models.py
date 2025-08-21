from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError



class Module(models.Model):
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(default=now)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Module, self).save(*args, **kwargs)

    @property
    def students(self):
        return User.objects.filter(module_enrollments__module=self)        

class Course(models.Model):
    title = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    module = models.ForeignKey(Module, on_delete=models.SET_NULL, related_name='courses',null=True)
    slug = models.SlugField(max_length=200, unique=True, primary_key=True, auto_created=False)
    short_description = models.TextField(blank=False, max_length=60)
    description = models.TextField(blank=False)
    outcome = models.CharField(max_length=200)
    requirements = models.CharField(max_length=200)
    language = models.CharField(max_length=200)
    
    level = models.CharField(max_length=20)
    banner = models.ImageField(upload_to='banners/', null=True)
    # students = models.ManyToManyField(
    #     User, related_name='courses_joined', blank=True
    # )    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)


    def students(self):
        
        return User.objects.filter(course_enrollments__course=self)

class ModuleEnrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='module_enrollments')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'module')

    def __str__(self):
        return f"{self.student.username} in module {self.module.title}"


class CourseEnrollment(models.Model):
    phase_enrollment = models.ForeignKey(
        ModuleEnrollment,
        on_delete=models.CASCADE,
        related_name='course_enrollments'
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('phase_enrollment', 'course')

    def clean(self):
        if self.phase_enrollment.module != self.course.module:
            raise ValidationError("ModuleEnrollment must belong to the same module as the course.")

    @property
    def student(self):
        return self.phase_enrollment.student

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.username} in course {self.course.title}"

