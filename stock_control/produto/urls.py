from django.urls import path
from stock_control.produto import views

app_name = 'produto'

urlpatterns = [
    path('', views.produto_list, name='produto_list'),
    path('<int:pk>/', views.produto_detail, name='produto_detail'),
    path('add/', views.ProdutoCreate.as_view(), name='produto_add'),
    path('<int:pk>', views.ProdutoUpdate.as_view(), name='produto_edit'),
]
