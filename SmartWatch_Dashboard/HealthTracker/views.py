from django.shortcuts import redirect, render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Patient
# from .models import RiskPercentange

# Create your views here.
def home(request):
    
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return redirect("/accounts/login")

@csrf_exempt
def predict(request):
    if request.method == "POST":
        return HttpResponse(f"{Patient.objects.get(username = json.loads(request.body)[-1]).heartbeats}", content_type="application/json")
    else:
        return redirect("/accounts/login")



def updateDetails(request):
    if request.method == "POST":
        username = request.POST.get("username")
        if username: 
            user = Patient.objects.filter(username=username).first()
            if user:
                user.sex = int(request.POST["sex"])
                user.chestpain = int(request.POST["chestpain"])
                user.angina = int(request.POST["angina"])
                user.slope = int(request.POST["slope"])
                user.thalassemia = int(request.POST["thalassemia"])
                user.major_vessels = int(request.POST["major_vessels"])
                user.cholestorol = int(request.POST["cholestorol"])
                user.st_depression = int(request.POST["st_depression"])
                user.save()
        
    return redirect("/")

@csrf_exempt
def getPatient(request):
    username = json.loads(request.body)["username"]
    
    patient = Patient.objects.filter(username=username)
    ret = {"info": patient}
    qs = serializers.serialize("json", patient)
    ret["info"] = json.loads(qs)

    if patient.first().sex > -1:
        if patient.first().heartbeats > 0 and patient.first().blood_pressure > 0:
            ret["status"] = "200"
        else:
            ret["status"] = "hrErr"  
    else:
        ret["status"] = "404"

    qs = json.dumps(ret)
    return HttpResponse(f"{qs}", content_type="application/json")

# @csrf_exempt
# def getRiskPercentange(request):
#     risks = RiskPercentange.objects.all()
#     qs = serializers.serialize("json", risks)
#     return HttpResponse(f"{qs}", content_type="application/json")

@csrf_exempt
def changeBP(request, bp):
    username = json.loads(request.body)["username"]
    patient = Patient.objects.get(username=username)
    patient.blood_pressure = float(bp)
    patient.save()
    return HttpResponse("ok")

@csrf_exempt
def changeHeartBeat(request, heartBeat):
    username = json.loads(request.body)["username"]
    patient = Patient.objects.get(username=username)
    patient.heartbeats = float(heartBeat)
    patient.save()
    return HttpResponse("ok")

