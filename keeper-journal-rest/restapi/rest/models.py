from django.db import models
from django.contrib.auth.models import User

# Creating the database schema for journal entries
class Entry(models.Model):
    id         = models.PositiveIntegerField(primary_key=True)
    title      = models.CharField(max_length=255, null=False, blank=False)
    content    = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)
    user       = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['created_at']