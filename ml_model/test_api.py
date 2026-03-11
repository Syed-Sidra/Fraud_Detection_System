import requests

url = "http://127.0.0.1:8000/predict"

data = {
    "step": 10,
    "customer": 100,
    "age": 4,
    "gender": 1,
    "zipcodeOri": 28007,
    "merchant": 200,
    "zipMerchant": 28007,
    "category": 3,
    "amount": 500
}

response = requests.post(url, params=data)

print(response.json())