from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/",views.register),
    path('profile/<str:pk>/',views.getUserProfile,name="user_profile"),
    path('profile/update/<str:pk>/',views.updateUserProfile,name="user_profile_update"),
    path('delete/<str:pk>/',views.deleteUser,name="deleteUser"),
    path('',views.getAllEmployees,name="deleteUser"),
    # department path
     path('departments/', views.department_list_create),
    path('departments/<int:pk>/', views.department_detail),
]
