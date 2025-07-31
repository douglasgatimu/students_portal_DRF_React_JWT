from django.contrib import admin
from .models import Course, Module
from lesson.models import Lesson

# Register your models here.

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug']
    


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'module', 'created_at']
    list_filter = ['created_at', 'module']
    
    



