package com.frauddetection.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class MlService {

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public record MlPrediction(boolean isFraud, double confidence, double riskScore, double fraudProbability) {}

    public MlPrediction predict(double amount, int hour, int dayOfWeek,
                                String merchantCategory, String deviceType,
                                String transactionType, int failedAttempts,
                                boolean isInternational, boolean locationChanged) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("amount", amount);
            body.put("hour", hour);
            body.put("day_of_week", dayOfWeek);
            body.put("merchant_category", merchantCategory != null ? merchantCategory : "UNKNOWN");
            body.put("device_type", deviceType != null ? deviceType : "UNKNOWN");
            body.put("transaction_type", transactionType != null ? transactionType : "DEBIT");
            body.put("failed_attempts", failedAttempts);
            body.put("is_international", isInternational);
            body.put("location_changed", locationChanged);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                mlUrl + "/predict", entity, Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> res = response.getBody();
                boolean fraud = Boolean.TRUE.equals(res.get("is_fraud"));
                double conf = ((Number) res.getOrDefault("confidence", 0)).doubleValue();
                double risk = ((Number) res.getOrDefault("risk_score", 0)).doubleValue();
                double prob = ((Number) res.getOrDefault("fraud_probability", 0)).doubleValue();
                return new MlPrediction(fraud, conf, risk, prob);
            }
        } catch (Exception e) {
            log.warn("ML service unavailable: {}", e.getMessage());
        }
        return new MlPrediction(false, 0, 0, 0);
    }

    public boolean isAvailable() {
        try {
            ResponseEntity<Map> resp = restTemplate.getForEntity(mlUrl + "/health", Map.class);
            return resp.getStatusCode() == HttpStatus.OK;
        } catch (Exception e) {
            return false;
        }
    }
}
