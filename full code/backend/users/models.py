from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id=models.AutoField(primary_key=True)
    email=models.EmailField(verbose_name='email',max_length=225,unique=True)
    # name= models.CharField(null=False,max_length=200)
    designation=models.CharField(null=True,max_length=225)
    is_staff=models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    # USERNAME_FIELD='email'
    # REQUIRED_FIELD=['email']
    REQUIRED_FIELDS = ['username']
    
    def get_username(self):
        return self.email

