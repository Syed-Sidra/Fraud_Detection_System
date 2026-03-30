# 🛡️ FraudGuard — Digital Banking Fraud Detection & Simulation Engine

> A full-stack fraud detection platform combining rule-based logic and machine learning to detect, alert, and visualize banking fraud in real time.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-green)
![Angular](https://img.shields.io/badge/Angular-17-red)
![PrimeNG](https://img.shields.io/badge/PrimeNG-17-blue)
![Python](https://img.shields.io/badge/Python-3.10-yellow)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

---

## 🎯 Project Overview

FraudGuard is a complete digital banking fraud detection and simulation engine. It monitors transactions in real time, evaluates each one through a dual-layer detection system (rule engine + ML model), generates detailed fraud alerts with plain-English explanations, and sends automated HTML email notifications to analysts.

### What makes it different from a basic CRUD project

Most college projects store and display data. FraudGuard actively **analyzes** every transaction using:

1. **Rule Engine** — 8 hard-coded fraud rules that fire in under 10ms, adding risk points for suspicious patterns
2. **ML Model** — Random Forest classifier trained on 594,000 real Kaggle banking records, predicting fraud probability
3. **Combined Score** — both results shown together in every alert card, with agreement comparison on the ML Insights page

The analyst doesn't just see "FRAUD" — they see *exactly why*: "3 transactions from account ACC001 in the last 5 minutes; Amount ₹57,500 exceeds ₹50,000 threshold."

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Angular 17 + PrimeNG 17 | Dashboard, alerts, analytics UI |
| **Charts** | Chart.js via PrimeNG | 6 analytics charts |
| **Backend** | Java 17 + Spring Boot 3.2 | API server, fraud rules, business logic |
| **Security** | Spring Security + JWT (JJWT 0.11.5) | Authentication, role enforcement |
| **ORM** | Spring Data JPA + Hibernate | Database operations |
| **Database** | MySQL 8.0 | Transaction and alert storage |
| **ML Service** | Python 3.10 + FastAPI | Random Forest model serving |
| **ML Library** | scikit-learn + pandas + NumPy | Model training and prediction |
| **Email** | Spring Mail + Gmail SMTP | Automated fraud email alerts |
| **Build** | Maven 3.8 + Node.js 18 + npm | Build and dependency management |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  Angular Frontend (Port 4200)                │
│                                                              │
│  Dashboard │ Live Feed │ Alerts │ Analytics │ Simulation     │
│  ML Insights │ System Status │ Login │ Register              │
└────────────────────────────┬─────────────────────────────────┘
                             │  HTTP/HTTPS + JWT Bearer Token
                             │  Proxy: /api → localhost:8080
                             ▼
┌──────────────────────────────────────────────────────────────┐
│               Spring Boot Backend (Port 8080)                │
│                                                              │
│  ┌─────────────────┐   ┌─────────────────┐                   │
│  │  JWT Auth Layer │   │  Fraud Rule      │                  │
│  │  BCrypt + JJWT  │   │  Engine (8 rules)│                  │
│  └─────────────────┘   └─────────────────┘                   │
│  ┌─────────────────┐   ┌─────────────────┐                   │
│  │  REST API Layer │   │  Email Service   │                  │
│  │  17 endpoints   │   │  @Async SMTP     │                  │
│  └─────────────────┘   └─────────────────┘                   │
│  ┌─────────────────┐   ┌─────────────────┐                   │
│  │  Simulation     │   │  ML Client       │                  │
│  │  @Scheduled 3s  │   │  RestTemplate    │                  │
│  └─────────────────┘   └─────────────────┘                   │
└──────────────┬──────────────────────────────┬────────────────┘
               │ JPA / Hibernate              │ REST JSON
               ▼                              ▼
┌──────────────────────┐       ┌───────────────────────────────┐
│   MySQL Database     │       │   Python ML Service           │
│   Port 3306          │       │   FastAPI — Port 8000         │
│                      │       │                               │
│   • transactions     │       │   • Random Forest (.pkl)      │
│   • fraud_alerts     │       │   • StandardScaler (.pkl)     │
│   • users            │       │   • POST /predict             │
│   • simulation_logs  │       │   • POST /train               │
└──────────────────────┘       │   • GET  /model/info          │
                               │   • GET  /health              │
                               └───────────────────────────────┘
```

### Data Flow for a Single Transaction

```
Transaction arrives via POST /api/transactions
           │
           ▼
    Assign Transaction ID + Timestamp
           │
           ▼
    Run 8 Fraud Rules (FraudDetectionService)
    Calculate risk score 0–100
           │
           ▼
    Set FraudStatus: NORMAL / SUSPICIOUS / FRAUD
    Set Severity:   LOW / MEDIUM / HIGH / CRITICAL
           │
           ▼
    Save to MySQL (transactions table)
           │
           ├─── If isFraud ──────────────────────────────────►
           │                                                  │
           │                                          Save FraudAlert
           │                                          (fraud_alerts table)
           │                                                  │
           │                                    If severity >= MEDIUM:
           │                                    Send HTML Email (@Async)
           │
           ▼
    Return TransactionDto to caller
```

---

## ✨ Key Features

### 🔐 Authentication & Role-Based Access
- JWT login with BCrypt password hashing, 24-hour token expiry
- Two roles: **Admin** (full access) and **Analyst** (read + resolve only)
- `@PreAuthorize("hasRole('ADMIN')")` enforces permissions at API level
- Admin-only nav items hidden from Analyst sidebar dynamically
- `*ngIf="!item.adminOnly || role() === 'ADMIN'"` in Angular template

### 📡 Real-Time Transaction Monitoring
- Live feed auto-refreshing every 8 seconds using RxJS `interval()`
- Color-coded rows: 🟢 NORMAL · 🟡 SUSPICIOUS · 🔴 FRAUD
- Pause/resume live feed toggle button
- Risk score progress bar on every row
- Full transaction detail dialog with 13 fields

### ⚠️ Fraud Detection Engine
- 8 production-grade rules with weighted risk scoring
- Risk score 0–100 per transaction
- Every alert shows exact detection reason in plain English
- Reasons are combined: "Amount ₹47,500 exceeds threshold; Transaction at 3:00 AM"

### 🚨 Fraud Alerts System
- Paginated alert table with severity filter
- Critical alert strip at top of page for immediate action
- Resolve alert with analyst note workflow
- Alert detail dialog showing ML prediction + confidence
- Mark all alerts as read in one click

### 📊 KPI Dashboard
- Total transactions, fraud count, fraud %, active alerts
- All live — refresh every 15 seconds
- 30-day fraud trend line chart
- Severity doughnut, category bar, rules bar, status pie

### 🤖 ML Insights Panel
- Model accuracy, feature count, training date metrics
- Feature importance horizontal bar chart (12 features)
- Accuracy breakdown doughnut
- Real rule-vs-ML comparison table (fetches live from database)
- Retrain model button (Admin only) — triggers Python retraining

### 🎭 Simulation Engine (Admin only)
- Start/stop continuous fraud simulation with `@Scheduled(fixedDelay=3000)`
- 7 fraud scenarios with expected behavior descriptions
- Bulk generate 1–500 transactions instantly for testing
- Simulation running indicator in topbar (green pulsing dot)

### 🖥️ System Status Page
- Health check for all 3 services with response latency measurement
- All 17 API endpoints listed with method, path, auth requirement
- Uptime history dots (last 30 checks)
- Environment info panel

### 📧 Automated Email Alerts
- HTML email sent for MEDIUM / HIGH / CRITICAL fraud automatically
- Contains: severity badge, amount, risk score, detection reason, rule triggered, full transaction grid, dashboard link
- Runs `@Async` — never slows the transaction API
- Test endpoint: `POST /api/test/email`

---

## 📁 Project Structure

```
fraud-detection/
│
├── 📂 backend/                              Spring Boot (Java 17)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/frauddetection/
│       │   ├── 📂 config/
│       │   │   └── SecurityConfig.java      JWT filter chain, CORS, @EnableMethodSecurity
│       │   │
│       │   ├── 📂 controller/
│       │   │   ├── AuthController.java       /api/auth/** — login, register, health
│       │   │   ├── AlertController.java      /api/alerts/** — CRUD, stats, resolve
│       │   │   ├── TransactionController.java /api/transactions/** — list, save, live-feed
│       │   │   ├── DashboardAndSimulationController.java
│       │   │   ├── MlController.java         /api/ml/** — status, info, train
│       │   │   └── TestController.java       /api/test/email — SMTP test
│       │   │
│       │   ├── 📂 dto/
│       │   │   ├── AuthDto.java              LoginRequest, RegisterRequest, AuthResponse
│       │   │   ├── AlertDto.java             FraudAlert data transfer
│       │   │   ├── TransactionDto.java       Transaction data transfer
│       │   │   └── DashboardStatsDto.java    Full dashboard payload
│       │   │
│       │   ├── 📂 entity/
│       │   │   ├── User.java                 id, username, password, email, role
│       │   │   ├── Transaction.java          Full transaction with fraudStatus, riskScore
│       │   │   ├── FraudAlert.java           Alert with ruleTriggered, fraudReason, severity
│       │   │   └── SimulationLog.java        Tracks simulation runs
│       │   │
│       │   ├── 📂 repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── TransactionRepository.java  Complex JPQL queries, pagination
│       │   │   ├── FraudAlertRepository.java
│       │   │   └── SimulationLogRepository.java
│       │   │
│       │   ├── 📂 security/
│       │   │   ├── JwtUtil.java              Token generate, validate, extract claims
│       │   │   └── JwtAuthFilter.java        OncePerRequestFilter — validates every request
│       │   │
│       │   ├── 📂 service/
│       │   │   ├── AuthService.java          Login logic, user registration
│       │   │   ├── FraudDetectionService.java ← CORE — evaluates 8 rules, returns FraudResult
│       │   │   ├── TransactionService.java   Orchestrates save + fraud check + alert + email
│       │   │   ├── AlertService.java         Alert CRUD, resolve, stats
│       │   │   ├── DashboardService.java     Aggregates stats for dashboard
│       │   │   ├── SimulationService.java    @Scheduled tick, 7 scenario generators
│       │   │   ├── EmailService.java         @Async HTML email via JavaMailSender
│       │   │   ├── MlService.java            Calls Python /predict via RestTemplate
│       │   │   └── UserDetailsServiceImpl.java Spring Security user loading
│       │   │
│       │   └── FraudDetectionApplication.java  @SpringBootApplication @EnableAsync @EnableScheduling
│       │
│       └── resources/
│           └── application.properties
│
│
├── 📂 frontend/                             Angular 17 + PrimeNG 17
│   ├── package.json
│   ├── angular.json
│   ├── proxy.conf.json                      Forwards /api → http://localhost:8080
│   ├── tsconfig.json
│   └── src/
│       ├── main.ts
│       ├── styles.scss                      Global dark theme overrides for PrimeNG
│       ├── index.html
│       └── app/
│           ├── app.component.ts             Root: <router-outlet> + Toast + ConfirmDialog
│           ├── app.config.ts                provideRouter, provideHttpClient, provideAnimations
│           ├── app.routes.ts                Lazy-loaded routes for all pages
│           │
│           ├── 📂 core/
│           │   ├── guards/auth.guard.ts     Redirects unauthenticated users to /login
│           │   ├── interceptors/auth.interceptor.ts  Attaches Bearer token to every request
│           │   └── services/
│           │       ├── auth.service.ts      Signal-based, stores user in localStorage
│           │       └── api.service.ts       All backend HTTP calls in one place
│           │
│           ├── 📂 features/
│           │   ├── auth/login/              Dark themed login with demo credentials
│           │   ├── auth/register/           Role-selector registration form
│           │   ├── dashboard/               KPI cards + 3 charts + live feed + recent alerts
│           │   ├── transactions/            Paginated table + 5 filters + detail dialog
│           │   ├── alerts/                  Critical strip + table + resolve workflow
│           │   ├── analytics/               6 Chart.js charts + high-risk accounts table
│           │   ├── simulation/              7 scenario cards + start/stop + bulk generate
│           │   ├── ml-insights/             Model metrics + feature chart + comparison table
│           │   └── system-status/           Service health + endpoint list + uptime dots
│           │
│           └── 📂 shared/
│               ├── components/layout/      Sidebar + topbar + role indicator + alert bell
│               └── models/models.ts        All TypeScript interfaces
│
│
└── 📂 ml_service/                          Python FastAPI
    ├── app.py                              Main service — train, predict, health endpoints
    ├── requirements.txt
    └── fraud_model/                        Created after first training
        ├── fraud_model.pkl                 Trained Random Forest classifier
        ├── scaler.pkl                      StandardScaler fitted on training data
        └── meta.json                       Accuracy, features, training date
```

---

## 📋 Prerequisites

| Tool | Minimum Version | Download |
|------|----------------|---------|
| Java JDK | 17 | https://adoptium.net |
| Apache Maven | 3.8 | https://maven.apache.org |
| Node.js | 18 | https://nodejs.org |
| npm | 9 | Included with Node.js |
| Python | 3.10 | https://python.org |
| MySQL Server | 8.0 | https://dev.mysql.com/downloads |
| IntelliJ IDEA | Any | https://jetbrains.com/idea |

---


### ✅ Startup Checklist

| Service | URL | Expected Response |
|---------|-----|------------------|
| Spring Boot | http://localhost:8080/api/auth/health | `{"status":"UP"}` |
| Python ML | http://localhost:8000/health | `{"status":"UP"}` |
| Angular | http://localhost:4200 | Login page loads |
| MySQL | localhost:3306 | Backend connects without error |

---

## 🔑 Default Credentials

| Role |  Can Access |
|------|-----------|
| Admin |  All pages, Simulation, ML retrain, User Management |
| Analyst |  Dashboard, Alerts, Analytics, System Status |

---

## 📡 API Reference

All endpoints require JWT Bearer token in Authorization header except where marked Public.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | Public | Login → returns JWT + user info |
| `POST` | `/api/auth/register` | Admin only | Create new user account |
| `GET` | `/api/auth/health` | Public | API health check |

**Login request body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Login response:**
```json
{
  "token": "eyJhbGci...",
  "username": "admin",
  "email": "admin@test.com",
  "role": "ADMIN",
  "userId": 1
}
```

---

### Transactions

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/transactions` | JWT | List with filters and pagination |
| `POST` | `/api/transactions` | JWT | Save transaction (runs fraud detection) |
| `GET` | `/api/transactions/{transactionId}` | JWT | Get by transaction ID |
| `GET` | `/api/transactions/live-feed` | JWT | Latest 20 transactions |
| `GET` | `/api/transactions/high-risk-accounts` | JWT | Top accounts by fraud count |

**Query parameters for GET /api/transactions:**
```
fraudStatus    = NORMAL | SUSPICIOUS | FRAUD
minAmount      = 1000
maxAmount      = 50000
startDate      = 2024-01-01T00:00:00
endDate        = 2024-12-31T23:59:59
accountNumber  = ACC001
page           = 0
size           = 20
```

---

### Fraud Alerts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/alerts` | JWT | Paginated list, optional severity filter |
| `GET` | `/api/alerts/high-risk` | JWT | HIGH + CRITICAL alerts only |
| `GET` | `/api/alerts/by-rule/{rule}` | JWT | Filter by rule name |
| `GET` | `/api/alerts/unread-count` | JWT | Returns `{"count": 29}` |
| `PUT` | `/api/alerts/mark-all-read` | JWT | Mark all alerts as read |
| `PUT` | `/api/alerts/{id}/resolve` | JWT | Resolve with note |
| `GET` | `/api/alerts/stats/by-rule` | JWT | Alert counts per detection rule |
| `GET` | `/api/alerts/stats/by-severity` | JWT | Alert counts per severity |
| `GET` | `/api/alerts/recent` | JWT | Latest 10 alerts |

**Resolve request body:**
```json
{
  "note": "Verified with customer — legitimate transaction"
}
```

---

### Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/dashboard/stats` | JWT | Full dashboard payload including KPIs, charts, recent data |

---

### Simulation (Admin only)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/simulation/start` | Admin | Start simulation with scenario |
| `POST` | `/api/simulation/stop` | Admin | Stop simulation |
| `GET` | `/api/simulation/status` | JWT | `{"running": true, "scenario": "MIXED"}` |
| `POST` | `/api/simulation/bulk` | Admin | Generate N transactions instantly |

**Start simulation body:**
```json
{ "scenario": "MIXED" }
```

**Bulk generate body:**
```json
{ "count": 50, "scenario": "HIGH_VALUE" }
```

---

### ML Service

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/ml/status` | JWT | ML service up/down + URL |
| `GET` | `/api/ml/info` | JWT | Accuracy, feature importances, training date |
| `POST` | `/api/ml/train` | Admin | Trigger model retraining |

---

### Testing

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/test/email` | JWT | Send test email to verify SMTP config |

---

## 🕵️ Fraud Detection Rules

Each rule fires independently and adds points to the transaction risk score. Points accumulate.

| Rule Name | Trigger Condition | Risk Points Added |
|-----------|------------------|------------------|
| `VERY_HIGH_VALUE` | Transaction amount ≥ ₹50,000 | **+40** |
| `HIGH_VALUE` | Transaction amount ≥ ₹10,000 | **+20** |
| `RAPID_MULTIPLE_TRANSACTIONS` | 3 or more transactions from the same account within 5 minutes | **+30** |
| `SUSPICIOUS_MERCHANT` | Merchant name contains: CASINO, GAMBLING, CRYPTO, BITCOIN, DARKWEB, OFFSHORE | **+35** |
| `ODD_HOURS` | Transaction timestamp between 1:00 AM and 5:00 AM | **+15** |
| `LOCATION_MISMATCH` | Current transaction location differs from previous transaction location | **+25** |
| `MULTIPLE_FAILED_ATTEMPTS` | 3 or more failed attempts recorded before this transaction | **+30** |
| `INTERNATIONAL_IP` | IP address is not in a private range (not 192.168.x.x / 10.x.x.x / 172.x.x.x) | **+20** |

**Example multi-rule scenario:**
```
Transaction: ₹52,000 at Casino Royal at 3:00 AM from London

VERY_HIGH_VALUE      → +50 pts
SUSPICIOUS_MERCHANT  → +35 pts
ODD_HOURS            → +15 pts
LOCATION_MISMATCH    → +25 pts
                       ───────
Total risk score     →  115 → capped at 100
Fraud status         →  FRAUD
Severity             →  CRITICAL
Detection reason     →  "Amount ₹52,000 exceeds ₹50,000 threshold;
                         Transaction at high-risk merchant Casino Royal;
                         Transaction at unusual hour: 3:00 AM;
                         Location changed from Mumbai to London"
Email sent           →  Yes (CRITICAL)
```

---

## 📊 Risk Score System

| Score Range | Fraud Status | Severity | Color | Email Alert |
|-------------|-------------|----------|-------|-------------|
| 0 – 24 | NORMAL | LOW | 🟢 Green | No |
| 25 – 59 | SUSPICIOUS | MEDIUM | 🟡 Yellow | Yes |
| 60 – 79 | FRAUD | HIGH | 🟠 Orange | Yes |
| 80 – 100 | FRAUD | CRITICAL | 🔴 Red | Yes |

---

## 🤖 ML Model Details

### Algorithm
Random Forest Classifier with 200 decision trees, max depth 12, `class_weight='balanced'`

### Training Dataset
Kaggle Bank Transaction Fraud dataset

| Column | Type | Description |
|--------|------|-------------|
| `step` | int | Time unit of transaction |
| `customer` | string | Customer ID |
| `age` | string | Age category (0–6) |
| `gender` | string | M / F / E / U |
| `zipcodeOri` | string | Origin zip code |
| `merchant` | string | Merchant ID |
| `zipMerchant` | string | Merchant zip code |
| `category` | string | Transaction category (es_transportation, es_food, etc.) |
| `amount` | float | Transaction amount |
| `fraud` | int | **Target: 0 = normal, 1 = fraud** |

### Feature Engineering
The raw dataset columns are transformed into 12 ML features:

```python
amount          → transaction amount (raw)
amount_log      → log1p(amount) — reduces skew from large amounts
amount_norm     → amount / 10000, clipped 0–1
step            → transaction time step
step_hour       → step % 24 — proxy for hour of day
age_code        → age string mapped to integer (0–6)
gender_code     → gender mapped to integer (M=0, F=1, E=2, U=3)
category_risk   → risk score per category (es_travel=0.14, es_food=0.06)
is_high_amount  → 1 if amount > 1000, else 0
is_very_high    → 1 if amount > 5000, else 0
is_risky_cat    → 1 if travel/tech/hotel/contents category, else 0
is_common_cat   → 1 if transportation/food category, else 0
```

### Class Imbalance
The dataset has ~1.2% fraud (highly imbalanced). Handled by:
- `class_weight='balanced'` — fraud samples weighted ~83× higher during training
- `stratify=y` in train/test split — maintains 1.2% ratio in both sets
- Evaluation using F1 score and AUC-ROC, not raw accuracy

### Model Performance
- Accuracy: ~99%
- AUC-ROC: ~98%
- F1 Score: ~97%
---

## 🎭 Simulation Scenarios

| Scenario | What it generates | Expected Fraud % |
|----------|------------------|-----------------|
| `MIXED` | 70% normal + 30% fraudulent — realistic mix | ~30% |
| `NORMAL` | Only legitimate transactions, domestic, small amounts | 0% |
| `HIGH_VALUE` | All amounts ₹15,000 – ₹1,00,000 | ~80% |
| `RAPID` | Same account (ACC001) fires rapidly — triggers velocity rule | ~70% |
| `ODD_HOURS` | All transactions timestamped 1:00 AM – 5:00 AM | ~50% |
| `SUSPICIOUS_MERCHANT` | Casino Royal, CryptoExchange, GamblingHub | ~90% |
| `LOCATION_MISMATCH` | Previous: Mumbai → Current: London, international IP | ~85% |

---

## 🔒 Role-Based Access Control

### Admin — Full Access
- Dashboard, Live Feed, Alerts, Analytics
- **Simulation** — start/stop, change scenarios, bulk generate
- **ML Insights** — view model info AND retrain
- System Status
- Register new users
- Mark alerts resolved

### Analyst — Read + Resolve
- Dashboard, Live Feed, Alerts, Analytics, System Status
- Resolve and mark alerts
- **Cannot:** access Simulation (hidden + API blocked)
- **Cannot:** retrain ML model (API blocked)
- **Cannot:** register new users (API blocked)


---

## 📧 Email Alert System

### How it works

1. Transaction is saved → fraud engine calculates severity
2. If severity is MEDIUM, HIGH, or CRITICAL → `EmailService.sendFraudAlertEmail()` is called
3. Method is `@Async` → runs in a separate thread, never blocks the API response
4. Gmail SMTP sends a professional HTML email with full fraud details

### Email content
- Severity-colored header and badge
- Transaction amount (large, prominent)
- Risk score (0–100)
- Plain-English detection reason
- Rule triggered badge
- 8-cell info grid: Transaction ID, Account, User, Merchant, Location, Device, IP, Timestamp
- Direct link to FraudGuard dashboard

---

## 🔮 Future Enhancements

### Phase 1 — Easy enhancement
- **Export to CSV** — download alerts/transactions as CSV from Angular
- **User management page** — Admin table of all users with role and status toggle
- **Audit log** — track every alert resolution with user, timestamp, note
- **Transaction ID search bar** — jump directly to any transaction
- **Account history in alert dialog** — last 10 transactions from same account
- **Dark/light mode toggle** — switch PrimeNG theme at runtime

### Phase 2 — Core enhancements 
- **WebSocket real-time alerts** — replace polling with Spring STOMP push, zero latency
- **Mark account as high-risk** — permanent flag adds 30 points to all future transactions
- **Alert assignment workflow** — Admin assigns cases to specific analysts
- **PDF report generation** — date-range fraud summary using iTextPDF
- **Alert SLA timer** — auto-escalate CRITICAL alerts unresolved beyond 30 minutes
- **Account risk profile page** — full history per account number

### Phase 3 — Advanced ML 
- **XGBoost upgrade** — replace Random Forest for 1–3% better accuracy
- **SHAP explainability** — show per-feature contribution to each ML prediction
- **Isolation Forest (3rd detection layer)** — unsupervised anomaly detection
- **Fraud heatmap** — 24×7 grid showing fraud rate per hour/day of week
- **Auto-retraining pipeline** — weekly scheduled retraining on new transactions
- **Real-time fraud rate gauge** — alerts if fraud rate spikes above threshold

### Phase 4 — Production 
- **Docker Compose** — single command startup for all services
- **Apache Kafka** — event streaming for high-volume transaction ingestion
- **Progressive Web App** — mobile push notifications for CRITICAL alerts
- **AWS/Azure deployment** — cloud hosting with managed RDS and auto-scaling

---

## 👩‍💻 Author

**Syed Sidra Noor**
B.Tech Final Year — Fraud Detection & ML Project

**Project:** Digital Banking Fraud Detection & Simulation Engine
**Tech:** Java 17 · Spring Boot 3.2 · Spring Security · Angular 17 · PrimeNG · Python · FastAPI · scikit-learn · MySQL · Gmail SMTP

---

> *FraudGuard — Detecting fraud before damage is done.*
