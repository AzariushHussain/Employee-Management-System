from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Department

User=get_user_model()


class departmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields=['id','name']

class employeeSerializer(serializers.ModelSerializer):
        
    department = serializers.SerializerMethodField()

    class Meta:
        model=User
        fields=['id','firstName','lastName','gender','email','dateOfJoining','address','phoneNumber','salary','department','image','is_superuser']
    
    def get_department(self, obj):
        # Fetch the name of the department based on the 'Department' id
        if obj.Department:
            return obj.Department.name
        return None