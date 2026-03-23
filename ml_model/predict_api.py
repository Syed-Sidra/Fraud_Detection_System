from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load model
model = joblib.load("fraud_model.pkl")

# Load encoder
encoder = joblib.load("encoder.pkl")

categorical_columns = [
    "customer",
    "gender",
    "merchant",
    "category"
]


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

    try:

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

        # Encode categorical columns
        data[categorical_columns] = encoder.transform(data[categorical_columns])

        prediction = model.predict(data)[0]
        probability = model.predict_proba(data)[0][1]

        risk = "LOW"

        if probability > 0.75:
            risk = "HIGH"

        elif probability > 0.40:
            risk = "MEDIUM"

        return {
            "prediction": int(prediction),
            "fraud_probability": float(probability),
            "risk_level": risk
        }

    except Exception as e:
        return {"error": str(e)}
