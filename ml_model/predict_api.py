from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load model
model = joblib.load("fraud_model.pkl")

# Load encoders
encoders = joblib.load("encoders.pkl")


class Transaction(BaseModel):
    step: int
    customer: str
    age: int
    gender: str
    zipcodeOri: int
    merchant: str
    zipMerchant: int
    category: str
    amount: float


@app.post("/predict")
def predict(transaction: Transaction):

    data = pd.DataFrame([{
        "step": transaction.step,
        "customer": transaction.customer,
        "age": transaction.age,
        "gender": transaction.gender,
        "zipcodeOri": transaction.zipcodeOri,
        "merchant": transaction.merchant,
        "zipMerchant": transaction.zipMerchant,
        "category": transaction.category,
        "amount": transaction.amount
    }])

    # Encode categorical values
    for col in ["customer", "gender", "merchant", "category"]:
        data[col] = encoders[col].transform(data[col])

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "prediction": int(prediction),
        "fraud_probability": float(probability)
    }