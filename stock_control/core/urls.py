from django.urls import path
from stock_control.core import views

app_name = 'core'
urlpatterns = [
    path('', views.index, name='index')
]
