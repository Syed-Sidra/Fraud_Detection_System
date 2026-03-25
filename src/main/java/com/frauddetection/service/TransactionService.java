package com.frauddetection.service;

import com.frauddetection.dto.TransactionDto;
import com.frauddetection.entity.*;
import com.frauddetection.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository alertRepository;
    private final FraudDetectionService fraudDetectionService;
    private final EmailService emailService;

    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        if (transaction.getTransactionId() == null) {
            transaction.setTransactionId("TXN" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        }
        if (transaction.getTimestamp() == null) {
            transaction.setTimestamp(LocalDateTime.now());
        }

        // Run fraud detection
        FraudDetectionService.FraudResult result = fraudDetectionService.evaluate(transaction);
        transaction.setFraudStatus(result.fraudStatus());
        transaction.setRiskScore(result.riskScore());

        Transaction saved = transactionRepository.save(transaction);

        // Create alert if fraud or suspicious
        if (result.isFraud()) {
            FraudAlert alert = FraudAlert.builder()
                .transaction(saved)
                .ruleTriggered(result.ruleTriggered())
                .fraudReason(result.reason())
                .riskScore(result.riskScore())
                .severity(result.severity())
                .read(false)
                .resolved(false)
                .build();
            FraudAlert savedAlert = alertRepository.save(alert);

            // Send email for HIGH/CRITICAL
            if (result.severity() == FraudAlert.Severity.HIGH || result.severity() == FraudAlert.Severity.CRITICAL) {
                emailService.sendFraudAlertEmail(savedAlert);
                savedAlert.setEmailSent(true);
                alertRepository.save(savedAlert);
            }
        }

        return saved;
    }

    public Page<Transaction> getTransactions(
        Transaction.FraudStatus fraudStatus,
        BigDecimal minAmount, BigDecimal maxAmount,
        LocalDateTime startDate, LocalDateTime endDate,
        String accountNumber, int page, int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        return transactionRepository.findWithFilters(fraudStatus, minAmount, maxAmount, startDate, endDate, accountNumber, pageable);
    }

    public Optional<Transaction> findByTransactionId(String txnId) {
        return transactionRepository.findByTransactionId(txnId);
    }

    public List<Transaction> getRecentLiveFeed() {
        return transactionRepository.findTop20ByOrderByTimestampDesc();
    }

    public List<Object[]> getHighRiskAccounts() {
        return transactionRepository.getHighRiskAccounts(PageRequest.of(0, 10));
    }
}
