from django.urls import path
from .views import get_records

urlpatterns = [
    path('records/', get_records),
]