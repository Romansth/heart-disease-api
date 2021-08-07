from django.db import models

# Create your models here.

class Patient(models.Model):
    username = models.CharField(max_length=100, default=None)
    sex = models.IntegerField(default=-1)
    chestpain = models.IntegerField(default=-1)
    angina = models.IntegerField(default=-1)
    slope = models.IntegerField(default=-1)
    thalassemia = models.IntegerField(default=-1)
    heartbeats = models.IntegerField(default=-1)
    cholestorol = models.FloatField(default=-1)
    major_vessels= models.IntegerField(default=-1)
    st_depression = models.FloatField(default=-1)
    blood_pressure = models.FloatField(default=-1)


# class RiskPercentange(models.Model):
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='risk', related_query_name='risk')
#     label = models.CharField(max_length=128)
#     value = models.FloatField()

