package com.example.transaction.service;

import com.example.transaction.entity.Alert;
import com.example.transaction.entity.Transaction;
import com.example.transaction.repository.AlertRepository;
import com.example.transaction.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;
    private final AlertRepository alertRepository;

    public FraudDetectionService(TransactionRepository transactionRepository,
                                 AlertRepository alertRepository) {
        this.transactionRepository = transactionRepository;
        this.alertRepository = alertRepository;
    }

    public void evaluateTransaction(Transaction txn) {

        int score = 0;
        String rule = "None";

        // 1️⃣ High Amount
        if (txn.getAmount() > 100000) {
            score += 60;
            rule = "High Amount";
        }

        // 2️⃣ Odd Hour
        int hour = txn.getCreatedAt().getHour();
        if (hour >= 0 && hour <= 5) {
            score += 30;
            rule = "Odd Hour";
        }

        // 3️⃣ Failed Attempts
        if (txn.getFailedAttempts() != null && txn.getFailedAttempts() > 3) {
            score += 40;
            rule = "Multiple Failed Attempts";
        }

        // 4️⃣ High Velocity
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

        if (score >= 80) {
            txn.setStatus("FRAUD");
            createAlert(txn, rule, "HIGH");
        }
        else if (score >= 40) {
            txn.setStatus("SUSPICIOUS");
            createAlert(txn, rule, "MEDIUM");
        }
        else {
            txn.setStatus("NORMAL");
        }
    }

    private void createAlert(Transaction txn,
                             String rule,
                             String riskLevel) {

        Alert alert = new Alert();
        alert.setTransactionId(txn.getTransactionId());
        alert.setRuleTriggered(rule);
        alert.setRiskLevel(riskLevel);
        alert.setCreatedAt(LocalDateTime.now());

        alertRepository.save(alert);
    }
}