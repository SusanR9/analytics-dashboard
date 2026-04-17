from django.db import models

class Record(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    amount = models.IntegerField()
    date = models.DateField(auto_now_add=True)  # 👈 ADD THIS