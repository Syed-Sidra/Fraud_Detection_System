package com.frauddetection.service;

import com.frauddetection.entity.FraudAlert;
import com.frauddetection.entity.FraudAlert.Severity;
import com.frauddetection.entity.Transaction;
import com.frauddetection.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;

    private static final BigDecimal HIGH_AMOUNT_THRESHOLD = new BigDecimal("50000");
    private static final BigDecimal VERY_HIGH_AMOUNT_THRESHOLD = new BigDecimal("100000");
    private static final int RAPID_TXN_COUNT = 3;
    private static final int RAPID_TXN_MINUTES = 5;

    private static final List<String> SUSPICIOUS_MERCHANTS = List.of(
        "CASINO", "GAMBLING", "CRYPTO", "BITCOIN", "DARKWEB", "OFFSHORE"
    );

    public record FraudResult(
        boolean isFraud,
        Transaction.FraudStatus fraudStatus,
        String ruleTriggered,
        String reason,
        double riskScore,
        Severity severity
    ) {}

    public FraudResult evaluate(Transaction transaction) {
        List<String> triggeredRules = new ArrayList<>();
        List<String> reasons = new ArrayList<>();
        double totalScore = 0.0;

        // Rule 1: High Value Transaction
        if (transaction.getAmount().compareTo(VERY_HIGH_AMOUNT_THRESHOLD) >= 0) {
            triggeredRules.add("VERY_HIGH_VALUE");
            reasons.add("Transaction amount ₹" + transaction.getAmount() + " exceeds ₹100,000 threshold");
            totalScore += 40;
        } else if (transaction.getAmount().compareTo(HIGH_AMOUNT_THRESHOLD) >= 0) {
            triggeredRules.add("HIGH_VALUE");
            reasons.add("Transaction amount ₹" + transaction.getAmount() + " exceeds ₹50,000 threshold");
            totalScore += 20;
        }

        // Rule 2: Rapid Multiple Transactions
        LocalDateTime fiveMinutesAgo = transaction.getTimestamp().minusMinutes(RAPID_TXN_MINUTES);
        long recentCount = transactionRepository.countRecentTransactions(
            transaction.getAccountNumber(), fiveMinutesAgo
        );
        if (recentCount >= RAPID_TXN_COUNT) {
            triggeredRules.add("RAPID_MULTIPLE_TRANSACTIONS");
            reasons.add(recentCount + " transactions from same account in last 5 minutes");
            totalScore += 30;
        }

        // Rule 3: Odd Hours (1 AM - 5 AM)
        int hour = transaction.getTimestamp().getHour();
        if (hour >= 1 && hour <= 5) {
            triggeredRules.add("ODD_HOURS");
            reasons.add("Transaction at unusual hour: " + hour + ":00 AM");
            totalScore += 15;
        }

        // Rule 4: Suspicious Merchant
        if (transaction.getMerchantName() != null) {
            String merchantUpper = transaction.getMerchantName().toUpperCase();
            boolean suspicious = SUSPICIOUS_MERCHANTS.stream().anyMatch(merchantUpper::contains);
            if (suspicious) {
                triggeredRules.add("SUSPICIOUS_MERCHANT");
                reasons.add("Transaction at high-risk merchant: " + transaction.getMerchantName());
                totalScore += 35;
            }
        }

        // Rule 5: Location Mismatch
        if (transaction.getLocation() != null && transaction.getPreviousLocation() != null
            && !transaction.getLocation().equalsIgnoreCase(transaction.getPreviousLocation())) {
            triggeredRules.add("LOCATION_MISMATCH");
            reasons.add("Location changed from " + transaction.getPreviousLocation() + " to " + transaction.getLocation());
            totalScore += 25;
        }

        // Rule 6: Multiple Failed Attempts
        if (transaction.getFailedAttempts() != null && transaction.getFailedAttempts() >= 3) {
            triggeredRules.add("MULTIPLE_FAILED_ATTEMPTS");
            reasons.add(transaction.getFailedAttempts() + " failed attempts before this transaction");
            totalScore += 30;
        }

        // Rule 7: Foreign / International IP
        if (transaction.getIpAddress() != null && isInternationalIp(transaction.getIpAddress())) {
            triggeredRules.add("INTERNATIONAL_IP");
            reasons.add("Transaction from international IP: " + transaction.getIpAddress());
            totalScore += 20;
        }

        // Cap at 100
        double riskScore = Math.min(totalScore, 100.0);

        if (triggeredRules.isEmpty()) {
            return new FraudResult(false, Transaction.FraudStatus.NORMAL, "NONE", "No fraud indicators", riskScore, Severity.LOW);
        }

        String primaryRule = triggeredRules.get(0);
        String combinedReason = String.join("; ", reasons);

        Transaction.FraudStatus status;
        Severity severity;

        if (riskScore >= 60) {
            status = Transaction.FraudStatus.FRAUD;
            severity = riskScore >= 80 ? Severity.CRITICAL : Severity.HIGH;
        } else if (riskScore >= 25) {
            status = Transaction.FraudStatus.SUSPICIOUS;
            severity = Severity.MEDIUM;
        } else {
            status = Transaction.FraudStatus.NORMAL;
            severity = Severity.LOW;
        }

        return new FraudResult(riskScore >= 25, status, primaryRule, combinedReason, riskScore, severity);
    }

    private boolean isInternationalIp(String ip) {
        // Simplified: check if not private range
        return !ip.startsWith("192.168.") && !ip.startsWith("10.") && !ip.startsWith("172.") && !ip.startsWith("127.");
    }
}
