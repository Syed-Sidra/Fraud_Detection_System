package com.frauddetection.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class MlService {

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    // ── Is the ML service reachable? ─────────────────────────────────────
    public boolean isAvailable() {
        try {
            ResponseEntity<Map> resp = restTemplate
                    .getForEntity(mlUrl + "/health", Map.class);
            return resp.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.warn("ML service unavailable: {}", e.getMessage());
            return false;
        }
    }

    // ── Main predict call — returns ensemble result ───────────────────────
    /**
     * Returns a map containing:
     *   is_fraud           boolean
     *   confidence         double  (0-100)
     *   fraud_probability  double  (0-1)
     *   rf_probability     double  (0-1)  — Random Forest individual
     *   gb_probability     double  (0-1)  — Gradient Boosting individual
     *   lr_probability     double  (0-1)  — Logistic Regression individual
     *   risk_score         double  (0-100)
     *   model_used         String  "VotingEnsemble (RF:0.4 + GB:0.4 + LR:0.2)"
     */
    public Map<String, Object> predict(BigDecimal amount, String category,
                                       String gender, String age, int step) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("amount",            amount);
            body.put("category",          category != null ? category : "es_transportation");
            body.put("gender",            gender   != null ? gender   : "M");
            body.put("age",               age      != null ? age      : "3");
            body.put("step",              step);
            body.put("merchant_category", category != null ? category : "es_transportation");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> resp = restTemplate.postForEntity(
                    mlUrl + "/predict", entity, Map.class);

            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                return resp.getBody();
            }
        } catch (Exception e) {
            log.error("ML predict error: {}", e.getMessage());
        }
        return fallbackResult();
    }

    // ── Simplified predict used by TransactionService ────────────────────
    public MlPrediction predictTransaction(BigDecimal amount, String merchantCategory) {
        Map<String, Object> raw = predict(amount, merchantCategory, "M", "3", 0);
        return parsePrediction(raw);
    }

    // ── Parse raw map into typed DTO ──────────────────────────────────────
    public MlPrediction parsePrediction(Map<String, Object> raw) {
        if (raw == null) return new MlPrediction(false, 0.0, 0.0, 0.0, 0.0, 0.0, "unavailable");

        boolean isFraud   = Boolean.TRUE.equals(raw.get("is_fraud"));
        double  conf      = toDouble(raw.get("confidence"));
        double  prob      = toDouble(raw.get("fraud_probability"));
        double  rfProb    = toDouble(raw.get("rf_probability"));
        double  gbProb    = toDouble(raw.get("gb_probability"));
        double  lrProb    = toDouble(raw.get("lr_probability"));
        String  model     = raw.getOrDefault("model_used", "VotingEnsemble").toString();

        return new MlPrediction(isFraud, conf, prob, rfProb, gbProb, lrProb, model);
    }

    // ── Get compare data for ML Insights ─────────────────────────────────
    public Map getCompareData() {
        try {
            ResponseEntity<Map> resp = restTemplate
                    .getForEntity(mlUrl + "/compare", Map.class);
            if (resp.getStatusCode().is2xxSuccessful()) return resp.getBody();
        } catch (Exception e) {
            log.error("ML compare error: {}", e.getMessage());
        }
        return null;
    }

    // ── Fallback when ML is unavailable ──────────────────────────────────
    private Map<String, Object> fallbackResult() {
        Map<String, Object> f = new HashMap<>();
        f.put("is_fraud",          false);
        f.put("confidence",        0.0);
        f.put("fraud_probability", 0.0);
        f.put("rf_probability",    0.0);
        f.put("gb_probability",    0.0);
        f.put("lr_probability",    0.0);
        f.put("risk_score",        0.0);
        f.put("model_used",        "unavailable");
        return f;
    }

    private double toDouble(Object v) {
        if (v == null) return 0.0;
        try { return ((Number) v).doubleValue(); }
        catch (Exception e) { return 0.0; }
    }

    // ── Inner DTO ─────────────────────────────────────────────────────────
    public static class MlPrediction {
        public final boolean isFraud;
        public final double  confidence;
        public final double  fraudProbability;
        public final double  rfProbability;   // Random Forest
        public final double  gbProbability;   // Gradient Boosting
        public final double  lrProbability;   // Logistic Regression
        public final String  modelUsed;

        public MlPrediction(boolean isFraud, double confidence,
                            double fraudProbability,
                            double rfProbability,
                            double gbProbability,
                            double lrProbability,
                            String modelUsed) {
            this.isFraud          = isFraud;
            this.confidence       = confidence;
            this.fraudProbability = fraudProbability;
            this.rfProbability    = rfProbability;
            this.gbProbability    = gbProbability;
            this.lrProbability    = lrProbability;
            this.modelUsed        = modelUsed;
        }
    }
}
