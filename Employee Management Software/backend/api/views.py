from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated;
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import employeeSerializer
from rest_framework.response import Response
from .models import Department
from .serializers import departmentSerializer

User=get_user_model()

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register(request):
    data = request.data
    try:
        # Get the Department instance based on the provided department name
        department_name = data['department']
        department_instance = Department.objects.get(name=department_name)

        # Create the Employee instance and assign the Department instance
        user = User.objects.create(
            firstName=data['firstName'],
            lastName=data['lastName'],
            gender=data['gender'],
            email=data['email'],
            address=data['address'],
            phoneNumber=data['phoneNumber'],
            salary=data['salary'],
            Department=department_instance,  # Assign the Department instance
            password=make_password(data['password'])
        )

        serializer = employeeSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Department.DoesNotExist:
        return Response({'error': f"Department with name '{department_name}' does not exist."},
                        status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request,pk):
    user=User.objects.get(id=pk)
    serializer=employeeSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = employeeSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            # Update the department based on the received department name
            department = request.data['department']
            if department:
                department= Department.objects.get(name=department)
                user.Department = department

            serializer.save()
            
            return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request,pk):
    userForDeletion=User.objects.get(id=pk)
    serializer=employeeSerializer(userForDeletion)
    data=serializer.data
    userForDeletion.delete()
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllEmployees(request):
     users=User.objects.all()
     serializer=employeeSerializer(users,many=True)
     return Response(serializer.data)



# Department views

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def department_list_create(request):
    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = departmentSerializer(departments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = departmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def department_detail(request, pk):
    try:
        department = Department.objects.get(pk=pk)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = departmentSerializer(department)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = departmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        departmentForDeletion=Department.objects.get(id=pk)
        serializer=departmentSerializer(departmentForDeletion)
        data=serializer.data
        departmentForDeletion.delete()
        return Response(data)