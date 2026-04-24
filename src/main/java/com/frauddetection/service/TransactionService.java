package com.frauddetection.service;

import com.frauddetection.dto.TransactionDto;
import com.frauddetection.entity.FraudAlert;
import com.frauddetection.entity.Transaction;
import com.frauddetection.repository.FraudAlertRepository;
import com.frauddetection.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final TransactionRepository  transactionRepository;
    private final FraudAlertRepository   fraudAlertRepository;
    private final FraudDetectionService  fraudDetectionService;
    private final MlService              mlService;
    private final EmailService           emailService;

    // ── Save a transaction — called by both API and simulation ────────────
    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        // Assign ID and timestamp if missing (simulation path)
        if (transaction.getTransactionId() == null) {
            transaction.setTransactionId(
                    "TXN" + System.currentTimeMillis()
                            + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        }
        if (transaction.getTimestamp() == null) {
            transaction.setTimestamp(LocalDateTime.now());
        }

        // ── Step 1: Rule engine ───────────────────────────────────────────
        FraudDetectionService.FraudResult result = fraudDetectionService.evaluate(transaction);
        transaction.setFraudStatus(result.fraudStatus());
        transaction.setRiskScore(result.riskScore());
        // Use TransactionStatus (the correct enum name in your entity)
        transaction.setStatus(Transaction.TransactionStatus.SUCCESS);

        Transaction saved = transactionRepository.save(transaction);

        // ── Step 2: If fraud detected → create alert + call ML ensemble ──
        if (result.isFraud()) {
            createAlertWithEnsemble(saved, result);
        }

        return saved;
    }

    @Async
    protected void createAlertWithEnsemble(Transaction txn,
                                           FraudDetectionService.FraudResult result) {
        // amount is BigDecimal in your entity — convert to double for ML service
        double amountDouble = txn.getAmount() != null
                ? txn.getAmount().doubleValue()
                : 0.0;

        // Call Voting Ensemble ML service
        MlService.MlPrediction ml = mlService.predictTransaction(
                BigDecimal.valueOf(amountDouble),
                txn.getMerchantCategory()
        );

        // Build alert using builder — only fields that exist on your FraudAlert entity
        FraudAlert alert = FraudAlert.builder()
                .transaction(txn)
                .ruleTriggered(result.ruleTriggered())
                .fraudReason(result.reason())
                .riskScore(result.riskScore())
                .severity(result.severity())
                .mlPrediction(ml.isFraud)
                .mlConfidence(ml.confidence)
                .mlFraudProbability(ml.fraudProbability)
                .mlRfProbability(ml.rfProbability)
                .mlGbProbability(ml.gbProbability)
                .mlLrProbability(ml.lrProbability)
                .mlModelUsed(ml.modelUsed)
                .alertTime(LocalDateTime.now())
                .read(false)
                .resolved(false)
                .build();

        FraudAlert savedAlert = fraudAlertRepository.save(alert);

        // Send email for HIGH / CRITICAL
        if (result.severity() == FraudAlert.Severity.HIGH
                || result.severity() == FraudAlert.Severity.CRITICAL) {
            emailService.sendFraudAlertEmail(savedAlert);
            savedAlert.setEmailSent(true);
            fraudAlertRepository.save(savedAlert);
        }
    }

    // ── Paginated list with filters — uses your existing repository method ─
    public Page<Transaction> getTransactions(
            Transaction.FraudStatus fraudStatus,
            BigDecimal minAmount, BigDecimal maxAmount,
            LocalDateTime startDate, LocalDateTime endDate,
            String accountNumber, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        // Uses the findWithFilters JPQL query already in your repository
        return transactionRepository.findWithFilters(
                fraudStatus, minAmount, maxAmount,
                startDate, endDate, accountNumber, pageable);
    }

    // ── Live feed ─────────────────────────────────────────────────────────
    public List<Transaction> getRecentLiveFeed() {
        return transactionRepository.findTop20ByOrderByTimestampDesc();
    }

    // ── Single transaction by ID ──────────────────────────────────────────
    public Optional<Transaction> findByTransactionId(String txnId) {
        return transactionRepository.findByTransactionId(txnId);
    }

    // ── High-risk accounts ────────────────────────────────────────────────
    public List<Object[]> getHighRiskAccounts() {
        // Uses getHighRiskAccounts already in your repository
        return transactionRepository.getHighRiskAccounts(PageRequest.of(0, 10));
    }
}