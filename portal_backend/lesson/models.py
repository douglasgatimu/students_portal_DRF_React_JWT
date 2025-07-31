from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from courses.models import Course
from datetime import timedelta


class Lesson(models.Model):
    LESSON_TYPES = [
    ('reading', 'Reading'),
    ('lab', 'Lab'),
    ('quiz', 'Quiz'),
    
    ]
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES, default='reading')

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=100)
    duration = models.DurationField(default=timedelta(seconds=3600))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title        

class ContentBase(models.Model):
    owner = models.ForeignKey(
        User,
        related_name='%(class)s_related',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

    def __str__(self):
        return self.title        
    

class Text(ContentBase):
    content = models.TextField()


class Image(ContentBase):
    image = models.ImageField(upload_to='images/')
   

class File(ContentBase):
    file = models.FileField(upload_to='files/')


class Video(ContentBase):
    url = models.URLField()



class LessonItem(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='items')
    
    
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        limit_choices_to={
            'model__in': ('text', 'video', 'image', 'file', 'quiz', 'lab')
        }
        )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    order = models.PositiveIntegerField(default=0)
    

    
    class Meta:
        ordering = ['order']
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

class Lab(ContentBase):
    description = models.TextField()
    instructions = models.TextField()
    
class Quiz(ContentBase):
    pass

class QuizQuestion(models.Model):
    pass

class QuizAnswer(models.Model):
    pass    