from django.urls import path
from django.urls.resolvers import URLPattern
from . import views


urlpatterns = [
    path("", views.home, name="user_home"),
    path("login/", views.login, name="user_login"),
    path("register", views.register, name="user_register"),
    path("logout", views.logout, name="user_logout"),
    path("addPatient", views.addPatient, name="user_addPatient")
]