from flask import Flask
from flask import Flask
from flask import render_template, request
import requests

app = Flask(__name__)
url = r"http://127.0.0.1:5001/predict"


@app.route('/', methods=["GET", "POST"])
def home():
    data = {
        'success': 0,
        'prediction': 0,
        'class': 'green',
    }
    json_data = {}
    if request.method == "POST":
        # json_data["age"] = request.form['age']
        json_data["sex"] = request.form['sex']
        json_data["chestpain"] = request.form['chestpain']
        json_data["bp"] = request.form['bp']
        json_data["cholestrol"] = request.form['cholestrol']
        # json_data["sugar"] = request.form['sugar']
        # json_data["ecg"] = request.form['ecg']
        json_data["heartrate"] = request.form['heartrate']
        json_data["angina"] = request.form['angina']
        json_data["depression"] = request.form['depression']
        json_data["slope"] = request.form['slope']
        json_data["vessels"] = request.form['vessels']
        json_data["thalassemia"] = request.form['thalassemia']
        # json_data["complications"] = request.form['complications']

        prediction = (requests.post(url, json=json_data)).json()

        data['success'] = 1 if prediction['status'] == 'success' else 0
        data['prediction'] = prediction['value']
        # if data['prediction'] > 70: 
        #     data["class"] = "red"



    return render_template("index.html", data=data)


app.run(debug=False)
