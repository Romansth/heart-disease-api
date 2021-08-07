from django.urls import path
from . import views


urlpatterns = [
    path("", views.home),
    # path("get" , views.getRiskPercentange),
    path("update",  views.updateDetails, name="updateDetails"),
    path("info" , views.getPatient),
    path("bp/<str:bp>", views.changeBP),
    path("heart-rate/<str:heartBeat>", views.changeHeartBeat),
    path("predict", views.predict),
]
