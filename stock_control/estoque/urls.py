from django.urls import path
from stock_control.estoque import views


app_name = 'estoque'


urlpatterns = [
    path('', views.EstoqueEntradaList.as_view(), name='estoque_entrada_list'),

    path('<int:pk>/', views.EstoqueDetail.as_view(),
         name='estoque_detail'),

    path('add/', views.estoque_entrada_add, name='estoque_entrada_add'),

    path('saida/', views.EstoqueSaidaList.as_view(), name='estoque_saida_list'),

    path('saida/add/', views.estoque_saida_add, name='estoque_saida_add'),
]
