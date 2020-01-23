# -*- coding: utf-8 -*-
from django.urls import re_path

from . import views

urlpatterns = [
    re_path('updateCoords/', views.updateCoords, name = 'updateCoords'),
    re_path('getInfo/', views.get_buses_coords, name = 'getInfo'),
    re_path('map/', views.index, name = 'index')
]
