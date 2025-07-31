from django.db import models

from django.contrib.contenttypes.fields import GenericRelation


class QuizContent(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    lesson_items = GenericRelation('lesson.LessonItem')

class QuizQuestion(models.Model):
    quiz = models.ForeignKey(QuizContent, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    is_multiple_choice = models.BooleanField(default=False)

class QuizAnswer(models.Model):
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)