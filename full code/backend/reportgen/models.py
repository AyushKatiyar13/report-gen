from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.
class reports(models.Model):
    reportid=models.AutoField(primary_key=True)
    reportname=models.CharField(max_length=300)
    base_year=models.IntegerField()
    endyear=models.IntegerField()
    geography=models.CharField(max_length=300)
    market=models.CharField(max_length=300)
    industry=models.CharField(max_length=300)
    year=models.JSONField(blank=False, null=False)
    ASP=models.JSONField(blank=True, null=True)
    toc= models.JSONField(blank=False, null=False)
    tocprocessed=models.JSONField(blank=False, null=False)
    value=models.BooleanField()
    volume=models.BooleanField()
    creator=models.CharField(max_length=300)
    valueunit=models.CharField(max_length=300, null=True,blank=True)
    volumeunit=models.CharField(max_length=300, null=True,blank=True)
    reportloc=models.CharField(max_length=1000,blank=True, null=True)
    regiondet=models.JSONField(blank=True, null=True)
    createddate = models.DateField(auto_now= True)
    tablesplit=models.BooleanField(default=False)
    region=models.JSONField(blank=True, null=True)
    excelreport=models.CharField(max_length=1000,blank=True, null=True)
    reportFlag=models.BooleanField(default=True, null=True)
    # def __str__(self):
    #     return self.name


# class region(models.Model):
#     # id = models.AutoField(primary_key=True)
#     region=models.CharField(max_length=300)
#     country=models.JSONField(blank=False, null=True)
    
#     def __str__(self):
#         return self.name


class region1(models.Model):
    id = models.AutoField(primary_key=True)
    region=models.CharField(max_length=300)
    country=models.JSONField(blank=False, null=True)
    
    # def __str__(self):
    #     return self.name

# class country(models.Model):
#     # id=models.AutoField()
#     value=models.CharField(max_length=400)
#     country=models.CharField(primary_key=True,max_length=400)
#     label=models.CharField(max_length=400)
#     # country=models.JSONField(blank=False, null=True)
    
#     def __str__(self):
#         return self.name

