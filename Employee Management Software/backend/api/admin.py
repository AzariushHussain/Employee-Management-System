from django.contrib import admin
from .models import Employee

# Register your models here.

class EmployeeAdmin(admin.ModelAdmin):
    list_display=('email','firstName','lastName','gender','dateOfJoining')
    
admin.site.register(Employee,EmployeeAdmin)
