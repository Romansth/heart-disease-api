# Heart Disease Prediction API


This repository contains source code of our project for Provathon.  Heart Disease Prediction API is Machine Learning based solution to predict risks of heart disease using a integrable API.


# Description

Our solution is based on microservices architecture and the AI Model can be independently used in any other platform with ease. We've also included a simple demo hospital management system to show how the API works and how you can use our AI Model on a web app together.
Whenever you submit your data to our AI Model, it'll detect and tell you if the patient has the risk of heart disease.

## Technical Aspect

<img src="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB.61d334f1a1a427ea597afa54be359ca5a5aaad5f.png" width=100>  <img src="https://www.devteam.space/wp-content/uploads/2017/03/dockericon-min.png" width=100> <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" width=100>
<img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" width=100>

### Endpoint of AI Model ( Remote )
```
#api link
```

### Response

```json
{
  "risk":true,
  "status":"success",
  "value":"0.8849344"
}
```

**status** : If any error occured in backend it will say error else it will be set to success. <br>
**risk** : boolean value which says if the risk of heart disease is high ( default threshold is 75% ) <br>
**value** : Confidence measure of the AI Model.

# Installation of WebApp.

```bash
git clone https://github.com/Romansth/heart-disease-api.git
cd heart-disease-api/WebApp
pip install flask requests numpy pickle
python app.py
```

After running these commands, the blog will be hosted and you will be ready to test the endpoint.

# Installation of AI Model

```bash
cd heart-disease-api/AI_Models
pip install flask pickle numpy
python Deployed_Flask_App.py
```
After running these commands, the AI Model will be hosted on your machine. And you can go to /predict/<data> to test your endpoint.

Feel free to contribute !
