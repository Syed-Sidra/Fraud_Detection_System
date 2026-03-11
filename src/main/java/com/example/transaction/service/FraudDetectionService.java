package com.example.transaction.service;

import com.example.transaction.entity.Transaction;
import com.example.transaction.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TransactionGeneratorService {

    private final TransactionRepository repository;
    private final FraudDetectionService fraudService;
    private final Random random = new Random();

    public TransactionGeneratorService(TransactionRepository repository,
                                       FraudDetectionService fraudService) {
        this.repository = repository;
        this.fraudService = fraudService;
    }

    // Generate Random Transaction
    public Transaction generateRandomTransaction() {

        Transaction txn = buildRandomTransaction();
        fraudService.evaluateTransaction(txn);
        return repository.save(txn);
    }

    // Generate 10,000+ transactions efficiently
    public List<Transaction> generateBulkTransactions(int count) {

        List<Transaction> transactions = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            Transaction txn = buildRandomTransaction();
            fraudService.evaluateTransaction(txn);
            transactions.add(txn);
        }

        return repository.saveAll(transactions);
    }

    private Transaction buildRandomTransaction() {

        Transaction txn = new Transaction();

        txn.setTransactionId(UUID.randomUUID().toString());

        txn.setSenderName("User-" + random.nextInt(1000));
        txn.setSenderAccount("ACC" + random.nextInt(100000));

        txn.setReceiverName("Receiver-" + random.nextInt(1000));
        txn.setReceiverAccount("ACC" + random.nextInt(100000));

        txn.setTransactionType(random.nextBoolean() ? "CREDIT" : "DEBIT");
        txn.setAmount(500 + random.nextDouble() * 200000);


        txn.setDeviceId("Device-" + random.nextInt(50));
        txn.setIpAddress("192.168.0." + random.nextInt(255));

        txn.setFailedAttempts(random.nextInt(5));
        txn.setCreatedAt(LocalDateTime.now());

        return txn;
    }

    private String getRandomChannel() {
        String[] channels = {"ATM", "ONLINE", "UPI", "POS"};
        return channels[random.nextInt(channels.length)];
    }

    // Manual Save
    public Transaction saveManualTransaction(Transaction txn) {

        txn.setTransactionId(UUID.randomUUID().toString());
        txn.setCreatedAt(LocalDateTime.now());

        fraudService.evaluateTransaction(txn);

        return repository.save(txn);
    }
}