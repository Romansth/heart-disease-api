from HealthTracker.models import Patient
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import HttpResponse
from django.contrib import messages

def home(request):
    return redirect("user_login")


def logout(request):
    if request.method == "POST":
        auth.logout(request)
    return redirect("/")


def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        
        user = auth.authenticate(username=username, password=password)
        if user:
            auth.login(request, user=user)
            return redirect("/")
        else:
            messages.info(request, 'User Not Found')


    return redirect("/accounts/login")

def register(request):
    
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        pass1 = request.POST["password"]
        pass2 = request.POST["repassword"]

        if pass1 == pass2:
            if not User.objects.filter(email=email).exists():
                if not User.objects.filter(username=username).exists():
                    user = User.objects.create_user(username=username, password=pass1, email=email)
                    user.save()
                    patient = Patient.objects.create(username=username)
                    patient.save()
                    messages.info(request, 'User created. Please Log in.')
                    return redirect("/accounts/login")
                else:
                    messages.info(request, 'Username Taken')
            else:
                messages.info(request, 'Email Taken')
        else:
            messages.info(request, 'Passwords Donot match')
        
        return redirect("/accounts/signup")

    
    return redirect("/accounts/signup")


def addPatient(request):
    if not Patient.objects.filter(username=request.user.username).exists():
        patient = Patient.objects.create(username=request.user.username)
        patient.save()
    return redirect("/")