from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class EmployeeManager(BaseUserManager):
    def create_superuser(self,password, **other_fields):
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned is_superuser=True.')

        return self.create_user(password=password, **other_fields)

    def create_user(self,password, **other_fields):
        user = self.model(**other_fields)
        user.set_password(password)
        user.save()
        return user


class Department(models.Model):
    name=models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name

class Employee(AbstractBaseUser, PermissionsMixin):
    image = models.ImageField(upload_to='images/',null=True)
    

    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    gender = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female')])
    email = models.EmailField(null=True, unique=True)
    dateOfJoining = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=500,null=True)
    phoneNumber=models.CharField(max_length=10,unique=True,null=True)
    salary=models.IntegerField(null=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    Department=models.ForeignKey(Department,on_delete=models.CASCADE,null=True)

    objects = EmployeeManager()

    USERNAME_FIELD = 'email'

    class Meta:
        db_table = 'employee'

