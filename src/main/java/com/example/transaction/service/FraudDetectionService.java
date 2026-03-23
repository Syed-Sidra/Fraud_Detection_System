package com.example.transaction.service;

import com.example.transaction.entity.Alert;
import com.example.transaction.entity.Transaction;
import com.example.transaction.model.FraudResponse;
import com.example.transaction.repository.AlertRepository;
import com.example.transaction.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;
    private final AlertRepository alertRepository;

    @Autowired
    private EmailService emailService;

    private final RestTemplate restTemplate = new RestTemplate();

    public FraudDetectionService(TransactionRepository transactionRepository,
                                 AlertRepository alertRepository) {
        this.transactionRepository = transactionRepository;
        this.alertRepository = alertRepository;
    }

    public void evaluateTransaction(Transaction txn) {

        int score = 0;
        String rule = "None";

        // ✅ Ensure transactionId exists
        if (txn.getTransactionId() == null || txn.getTransactionId().isEmpty()) {
            txn.setTransactionId(UUID.randomUUID().toString());
        }

        // ✅ Ensure createdAt exists
        if (txn.getCreatedAt() == null) {
            txn.setCreatedAt(LocalDateTime.now());
        }

        Double amount = txn.getAmount();

        // 🔴 Amount Based Alerts
        if (amount != null) {

            // Very High Amount
            if (amount > 1000000) {

                score += 120;
                rule = "Very High Amount";

                txn.setStatus("FRAUD");

                createAlert(txn, rule, "HIGH");

                emailService.sendFraudAlert(
                        txn.getTransactionId(),
                        txn.getAmount()
                );

                txn.setRiskScore(score);

                return;
            }

            // High Amount
            else if (amount > 100000) {

                score += 80;
                rule = "High Amount";

                createAlert(txn, rule, "HIGH");
            }

            // Medium Amount
            else if (amount > 50000) {

                score += 40;
                rule = "Medium Amount";

                createAlert(txn, rule, "MEDIUM");
            }
        }

        // 🕐 Odd Hour Rule
        int hour = txn.getCreatedAt().getHour();

        if (hour >= 0 && hour <= 5) {
            score += 30;
            rule = "Odd Hour";
        }

        // ❌ Failed Attempts Rule
        if (txn.getFailedAttempts() != 0 && txn.getFailedAttempts() > 3) {

            score += 40;
            rule = "Multiple Failed Attempts";
        }

        // ⚡ High Velocity Rule
        LocalDateTime oneMinuteAgo = txn.getCreatedAt().minusMinutes(1);

        List<Transaction> recent =
                transactionRepository.findBySenderAccountAndCreatedAtAfter(
                        txn.getSenderAccount(),
                        oneMinuteAgo
                );

        if (recent.size() >= 3) {

            score += 50;
            rule = "High Velocity";
        }

        txn.setRiskScore(score);

        // 🤖 Call ML Model
        FraudResponse mlResponse = null;

        try {

            mlResponse = detectFraud(txn);

        } catch (Exception e) {

            System.out.println("ML API error: " + e.getMessage());
        }

        if (mlResponse != null) {

            System.out.println("ML Prediction: " + mlResponse.getPrediction());
            System.out.println("Fraud Probability: " + mlResponse.getFraud_probability());

            int mlScore = (int) (mlResponse.getFraud_probability() * 100);

            score += mlScore;

            txn.setRiskScore(score);
        }

        // 🚨 Final Decision

        if (score >= 120) {

            txn.setStatus("FRAUD");

            createAlert(txn, rule, "HIGH");

            emailService.sendFraudAlert(
                    txn.getTransactionId(),
                    txn.getAmount()
            );
        }

        else if (score >= 60) {

            txn.setStatus("SUSPICIOUS");

            createAlert(txn, rule, "MEDIUM");
        }

        else {

            txn.setStatus("NORMAL");
        }
    }

    // 🔁 Convert Transaction → ML Features
    private Map<String, Object> convertToMLFeatures(Transaction txn) {

        Map<String, Object> data = new HashMap<>();

        data.put("step", 1);
        data.put("customer", txn.getSenderAccount());
        data.put("age", 30);
        data.put("gender", "M");
        data.put("zipcodeOri", 28001);
        data.put("merchant", txn.getReceiverAccount());
        data.put("zipMerchant", 28001);
        data.put("category", "shopping");
        data.put("amount", txn.getAmount());

        return data;
    }

    // 🤖 Call FastAPI ML Model
    private FraudResponse detectFraud(Transaction txn) {

        String fastApiUrl = "http://localhost:8000/predict";

        Map<String, Object> features = convertToMLFeatures(txn);

        FraudResponse response =
                restTemplate.postForObject(
                        fastApiUrl,
                        features,
                        FraudResponse.class
                );

        return response;
    }

    // 🚨 Create Alert
    private void createAlert(Transaction txn,
                             String rule,
                             String riskLevel) {

        Alert alert = new Alert();

        alert.setTransactionId(txn.getTransactionId());
        alert.setRuleTriggered(rule);
        alert.setRiskLevel(riskLevel);
        alert.setRiskScore(txn.getRiskScore());
        alert.setCreatedAt(LocalDateTime.now());

        alertRepository.save(alert);
    }
}