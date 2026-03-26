"""
FraudGuard ML Service — FastAPI
Trained on Kaggle Bank Transaction Fraud Dataset
Columns: step, customer, age, gender, zipcodeOri, merchant,
         zipMerchant, category, amount, fraud
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import numpy as np
import pandas as pd
import joblib
import os
import json
from datetime import datetime

app = FastAPI(title="FraudGuard ML Service", version="2.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

MODEL_DIR    = "fraud_model"
MODEL_PATH   = os.path.join(MODEL_DIR, "fraud_model.pkl")
SCALER_PATH  = os.path.join(MODEL_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoders.pkl")
META_PATH    = os.path.join(MODEL_DIR, "meta.json")

model    = None
scaler   = None
encoders = {}
meta     = {}

# ── Kaggle dataset column categories ──────────────────────────────────────────
CATEGORIES = [
    'es_transportation', 'es_food', 'es_health', 'es_otherservices',
    'es_shopping', 'es_leisure', 'es_hyper', 'es_barsandrestaurants',
    'es_tech', 'es_hotelservices', 'es_sportsandtoys', 'es_home',
    'es_fashion', 'es_contents', 'es_wellnessandbeauty', 'es_travel'
]
GENDERS = ['M', 'F', 'E', 'U']


# ── Request / Response schemas ─────────────────────────────────────────────────
class PredictRequest(BaseModel):
    amount: float
    category: str = 'es_transportation'
    gender: str = 'M'
    age: str = '3'       # Kaggle dataset stores age as string category
    step: int = 0        # transaction step (time unit)
    merchant_category: Optional[str] = None  # alias for category

class PredictResponse(BaseModel):
    is_fraud: bool
    confidence: float
    risk_score: float
    fraud_probability: float
    model_used: str

class TrainResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    samples_used: int
    fraud_samples: int
    normal_samples: int
    trained_at: str
    dataset_source: str


# ── Feature engineering for your dataset ──────────────────────────────────────
def engineer_features(amount: float, category: str, gender: str,
                       age: str, step: int) -> np.ndarray:
    """
    Build feature vector matching your Kaggle dataset structure.
    """
    # Category risk mapping (from dataset analysis)
    cat_risk = {
        'es_transportation': 0.07, 'es_food': 0.06, 'es_health': 0.04,
        'es_otherservices': 0.08, 'es_shopping': 0.10, 'es_leisure': 0.09,
        'es_hyper': 0.08, 'es_barsandrestaurants': 0.05, 'es_tech': 0.12,
        'es_hotelservices': 0.11, 'es_sportsandtoys': 0.09, 'es_home': 0.07,
        'es_fashion': 0.08, 'es_contents': 0.13, 'es_wellnessandbeauty': 0.06,
        'es_travel': 0.14
    }

    # Age group numeric
    age_map = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, 'U': 3}
    gender_map = {'M': 0, 'F': 1, 'E': 2, 'U': 3}

    cat   = category.strip().lower()
    cr    = cat_risk.get(cat, 0.10)
    ag    = age_map.get(str(age), 3)
    gn    = gender_map.get(str(gender).upper(), 3)
    amt_log  = np.log1p(amount)
    amt_norm = min(amount / 10000.0, 1.0)

    features = [
        amount,
        amt_log,
        amt_norm,
        step,
        step % 24,           # hour of day proxy
        ag,
        gn,
        cr,
        int(amount > 1000),
        int(amount > 5000),
        int(cat in ['es_travel', 'es_contents', 'es_tech', 'es_hotelservices']),
        int(cat in ['es_transportation', 'es_food']),
    ]
    return np.array(features, dtype=float).reshape(1, -1)


def get_feature_names():
    return [
        'amount', 'amount_log', 'amount_norm', 'step', 'hour_proxy',
        'age_group', 'gender_code', 'category_risk',
        'is_high_amount', 'is_very_high_amount',
        'is_risky_category', 'is_common_category'
    ]


# ── Load your Kaggle dataset ───────────────────────────────────────────────────
def load_kaggle_dataset(path: str):
    """
    Load your Kaggle dataset with columns:
    step, customer, age, gender, zipcodeOri, merchant, zipMerchant, category, amount, fraud
    """
    df = pd.read_csv(path)
    print(f"Loaded dataset: {len(df)} rows | columns: {list(df.columns)}")

    # Strip quotes if present
    for col in ['age', 'gender', 'category', 'customer', 'merchant']:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip("'").str.strip('"').str.strip()

    df['amount'] = pd.to_numeric(df['amount'], errors='coerce').fillna(0)
    df['fraud']  = pd.to_numeric(df['fraud'],  errors='coerce').fillna(0).astype(int)

    # Category risk mapping
    cat_risk = {
        'es_transportation': 0.07, 'es_food': 0.06, 'es_health': 0.04,
        'es_otherservices': 0.08, 'es_shopping': 0.10, 'es_leisure': 0.09,
        'es_hyper': 0.08, 'es_barsandrestaurants': 0.05, 'es_tech': 0.12,
        'es_hotelservices': 0.11, 'es_sportsandtoys': 0.09, 'es_home': 0.07,
        'es_fashion': 0.08, 'es_contents': 0.13, 'es_wellnessandbeauty': 0.06,
        'es_travel': 0.14
    }
    age_map    = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'U':3}
    gender_map = {'M':0,'F':1,'E':2,'U':3}

    df['age_code']      = df['age'].map(age_map).fillna(3)
    df['gender_code']   = df['gender'].map(gender_map).fillna(3)
    df['category_risk'] = df['category'].map(cat_risk).fillna(0.10)
    df['amount_log']    = np.log1p(df['amount'])
    df['amount_norm']   = (df['amount'] / 10000.0).clip(0, 1)
    df['step_hour']     = df['step'] % 24
    df['is_high_amount']      = (df['amount'] > 1000).astype(int)
    df['is_very_high_amount'] = (df['amount'] > 5000).astype(int)
    df['is_risky_category']   = df['category'].isin(['es_travel','es_contents','es_tech','es_hotelservices']).astype(int)
    df['is_common_category']  = df['category'].isin(['es_transportation','es_food']).astype(int)

    feature_cols = [
        'amount', 'amount_log', 'amount_norm', 'step', 'step_hour',
        'age_code', 'gender_code', 'category_risk',
        'is_high_amount', 'is_very_high_amount',
        'is_risky_category', 'is_common_category'
    ]

    X = df[feature_cols].values
    y = df['fraud'].values

    fraud_count  = int(y.sum())
    normal_count = int(len(y) - fraud_count)
    print(f"Fraud: {fraud_count} | Normal: {normal_count} | Ratio: {fraud_count/len(y)*100:.2f}%")
    return X, y, fraud_count, normal_count


# ── Train endpoint ─────────────────────────────────────────────────────────────
@app.post("/train", response_model=TrainResponse)
async def train():
    global model, scaler, meta

    from sklearn.ensemble import RandomForestClassifier
    from sklearn.preprocessing import StandardScaler
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

    # Look for your dataset
    possible_paths = [
        "fraud_dataset.csv",
        "bs140513_032310.csv",      # common Kaggle filename for this dataset
        "transactions.csv",
        "dataset.csv",
    ]

    X, y, fraud_count, normal_count, dataset_source = None, None, 0, 0, "synthetic"

    for path in possible_paths:
        if os.path.exists(path):
            try:
                X, y, fraud_count, normal_count = load_kaggle_dataset(path)
                dataset_source = path
                print(f"Using dataset: {path}")
                break
            except Exception as e:
                print(f"Error loading {path}: {e}")

    if X is None:
        print("No CSV found — generating synthetic data matching your dataset structure")
        X, y = generate_synthetic(30000)
        fraud_count  = int(y.sum())
        normal_count = int(len(y) - fraud_count)
        dataset_source = "synthetic"

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_sc = scaler.fit_transform(X_train)
    X_test_sc  = scaler.transform(X_test)

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train_sc, y_train)

    y_pred  = model.predict(X_test_sc)
    y_proba = model.predict_proba(X_test_sc)[:, 1]

    acc  = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, zero_division=0))
    rec  = float(recall_score(y_test, y_pred, zero_division=0))
    f1   = float(f1_score(y_test, y_pred, zero_division=0))
    try:   auc = float(roc_auc_score(y_test, y_proba))
    except: auc = 0.0

    trained_at = datetime.now().isoformat()
    meta = {
        "accuracy_percent":    round(acc * 100, 2),
        "precision":           round(prec, 4),
        "recall":              round(rec, 4),
        "f1_score":            round(f1, 4),
        "roc_auc":             round(auc, 4),
        "trained_at":          trained_at,
        "type":                "RandomForest",
        "feature_count":       len(get_feature_names()),
        "loaded":              True,
        "feature_importances": {
            n: round(float(v), 6)
            for n, v in zip(get_feature_names(), model.feature_importances_)
        }
    }

    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(model,  MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    with open(META_PATH, "w") as f: json.dump(meta, f, indent=2)

    print(f"Model trained | acc={acc:.4f} | auc={auc:.4f} | source={dataset_source}")

    return TrainResponse(
        accuracy=acc, precision=prec, recall=rec, f1_score=f1, roc_auc=auc,
        samples_used=len(X_train), fraud_samples=fraud_count,
        normal_samples=normal_count, trained_at=trained_at,
        dataset_source=dataset_source
    )


def generate_synthetic(n=30000):
    """Synthetic data matching your Kaggle dataset structure."""
    np.random.seed(42)
    nf, nn = int(n * 0.12), int(n * 0.88)

    def normal(n):
        return {
            'amount':   np.random.lognormal(3, 1.5, n).clip(0.5, 800),
            'amount_log': None, 'amount_norm': None, 'step': np.random.randint(0, 180, n),
            'step_hour': np.random.randint(6, 22, n), 'age_code': np.random.randint(1, 6, n),
            'gender_code': np.random.choice([0,1], n), 'category_risk': np.random.uniform(.04,.10,n),
            'is_high_amount':0, 'is_very_high_amount':0, 'is_risky_category':0, 'is_common_category':1,
            'label': 0
        }
    def fraud(n):
        return {
            'amount':   np.random.lognormal(6, 1.8, n).clip(500, 50000),
            'amount_log': None, 'amount_norm': None, 'step': np.random.randint(0, 180, n),
            'step_hour': np.random.randint(0, 6, n), 'age_code': np.random.choice([0,6], n),
            'gender_code': np.random.choice([0,1,2,3], n), 'category_risk': np.random.uniform(.10,.20,n),
            'is_high_amount':1, 'is_very_high_amount':1, 'is_risky_category':1, 'is_common_category':0,
            'label': 1
        }

    rows = []
    for d, lab in [(normal(nn), 0), (fraud(nf), 1)]:
        amt = d['amount']
        for i in range(len(amt)):
            rows.append([
                amt[i], np.log1p(amt[i]), min(amt[i]/10000, 1),
                d['step'][i], d['step_hour'][i], d['age_code'][i],
                d['gender_code'][i], d['category_risk'][i],
                int(amt[i]>1000), int(amt[i]>5000), d['is_risky_category'], d['is_common_category']
            ])
    labels = np.array([0]*nn + [1]*nf)
    idx = np.random.permutation(len(rows))
    return np.array(rows)[idx], labels[idx]


# ── Predict endpoint ───────────────────────────────────────────────────────────
@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    global model, scaler
    if model is None:
        if os.path.exists(MODEL_PATH):
            model  = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
        else:
            await train()

    cat = req.merchant_category or req.category
    features = engineer_features(req.amount, cat, req.gender, req.age, req.step)
    features_sc = scaler.transform(features)

    proba      = model.predict_proba(features_sc)[0]
    fraud_prob = float(proba[1]) if len(proba) > 1 else float(proba[0])
    is_fraud   = fraud_prob >= 0.5
    confidence = fraud_prob if is_fraud else (1 - fraud_prob)

    return PredictResponse(
        is_fraud=is_fraud,
        confidence=round(confidence * 100, 2),
        risk_score=round(fraud_prob * 100, 2),
        fraud_probability=round(fraud_prob, 4),
        model_used="RandomForest"
    )


# ── Info / Health ──────────────────────────────────────────────────────────────
@app.get("/model/info")
async def model_info():
    if os.path.exists(META_PATH):
        with open(META_PATH) as f:
            return json.load(f)
    if model is None:
        return {"loaded": False, "message": "No model. POST /train first."}
    return {"loaded": True, "type": "RandomForest", "accuracy_percent": 0,
            "feature_count": len(get_feature_names()), "feature_importances": {}}

@app.get("/health")
async def health():
    return {"status": "UP", "model_loaded": model is not None,
            "accuracy_percent": meta.get("accuracy_percent", 0)}


# ── Startup ────────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    global model, scaler, meta
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
        model  = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        if os.path.exists(META_PATH):
            with open(META_PATH) as f: meta = json.load(f)
        print(f"Model loaded — accuracy: {meta.get('accuracy_percent', 0)}%")
    else:
        print("No saved model. POST /train to train.")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
