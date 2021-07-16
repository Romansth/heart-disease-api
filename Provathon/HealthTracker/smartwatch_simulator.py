from django.views.decorators import csrf
import requests
import time
import random

key = "YOUR_KEY_HERE"
username = "Prasun"

data = {"username": username, "key": key}

while True:
    heartBeat = random.randint(50,150)
    bp = random.randint(80,250)

    requests.post(f"http://127.0.0.1:8000/patient/bp/{bp}", json=data)
    requests.post(f"http://127.0.0.1:8000/patient/heart-rate/{heartBeat}", json=data)
    print(heartBeat, bp)
    time.sleep(1)