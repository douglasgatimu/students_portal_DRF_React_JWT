from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from django.contrib.auth.models import User


class Module(models.Model):
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(default=now)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Module, self).save(*args, **kwargs)

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
    
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(default=now)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Course, self).save(*args, **kwargs)




