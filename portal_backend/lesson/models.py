from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from courses.models import Course

class Lesson(models.Model):
    LESSON_TYPES = [
    ('reading', 'Reading'),
    ('lab', 'Lab'),
    ('quiz', 'Quiz'),
    
    ]
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES, default='reading')

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=100)
    duration = models.FloatField(default=3600)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(default=now)

    def __str__(self):
        return self.title        
    

class TextContent(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    lesson_items = GenericRelation('LessonItem')

class ImageContent(models.Model):
    image = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    lesson_items = GenericRelation('LessonItem')    

class FileContent(models.Model):
    file = models.FileField(upload_to='files/')
    created_at = models.DateTimeField(auto_now_add=True)
    lesson_items = GenericRelation('LessonItem')

class VideoContent(models.Model):
    url = models.URLField()
    # duration = models.IntegerField(help_text="Duration in seconds")
    created_at = models.DateTimeField(auto_now_add=True)
    lesson_items = GenericRelation('LessonItem')


class LessonItem(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='items')
    
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order']
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

class LabContent(models.Model):
    description = models.TextField()
    instructions = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    lesson_items = GenericRelation('LessonItem')