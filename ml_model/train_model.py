import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import roc_auc_score


# ==============================
# 1 Load Dataset
# ==============================

df = pd.read_csv("transactions_training.csv")

print("Dataset Loaded Successfully\n")
print(df.head())


# ==============================
# 2 Clean Dataset
# ==============================

# Remove single quotes
df = df.replace("'", "", regex=True)

# Convert numeric columns
df["age"] = pd.to_numeric(df["age"], errors="coerce")
df["zipcodeOri"] = pd.to_numeric(df["zipcodeOri"], errors="coerce")
df["zipMerchant"] = pd.to_numeric(df["zipMerchant"], errors="coerce")

# Fill missing values
df = df.fillna(0)


# ==============================
# 3 Encode Categorical Columns
# ==============================


encoders = {}

categorical_columns = [
    "customer",
    "gender",
    "merchant",
    "category"
]

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Save encoders
joblib.dump(encoders, "encoders.pkl")

# ==============================
# 4 Define Features and Target
# ==============================

X = df.drop("fraud", axis=1)
y = df["fraud"]


# ==============================
# 5 Train-Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("\nTraining Data Size:", len(X_train))
print("Testing Data Size:", len(X_test))


# ==============================
# 6 Train Model
# ==============================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

print("\nModel Training Completed")


# ==============================
# 7 Predictions
# ==============================

y_pred = model.predict(X_test)

# Probabilities for ROC
y_prob = model.predict_proba(X_test)[:, 1]


# ==============================
# 8 Accuracy
# ==============================

accuracy = accuracy_score(y_test, y_pred)

print("\n==============================")
print("MODEL ACCURACY")
print("==============================")

print("Accuracy:", round(accuracy * 100, 2), "%")


# ==============================
# 9 Confusion Matrix
# ==============================

cm = confusion_matrix(y_test, y_pred)

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(cm)


# ==============================
# 10 Classification Report
# ==============================

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(classification_report(y_test, y_pred))


# ==============================
# 11 ROC-AUC Score
# ==============================

roc = roc_auc_score(y_test, y_prob)

print("\n==============================")
print("ROC-AUC SCORE")
print("==============================")

print("ROC-AUC:", round(roc, 4))


# ==============================
# 12 Save Model
# ==============================

joblib.dump(model, "fraud_model.pkl")

print("\nModel Saved Successfully as fraud_model.pkl")