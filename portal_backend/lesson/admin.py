from django.contrib import admin
from lesson.models import Lesson, LessonItem, Text

# Register your models here.

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['created_at']
    


@admin.register(LessonItem)
class LessonItemAdmin(admin.ModelAdmin):
    list_display = ['lesson','content_object', ]
    
    
@admin.register(Text)
class TextAdminAdmin(admin.ModelAdmin):
    list_display = ['created_at']
      



