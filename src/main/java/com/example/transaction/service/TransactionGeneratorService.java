package com.example.transaction.service;

import com.example.transaction.entity.Transaction;
import com.example.transaction.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TransactionGeneratorService {

    private final TransactionRepository repository;
    private final Random random = new Random();

    public TransactionGeneratorService(TransactionRepository repository) {
        this.repository = repository;
    }

    // Generate single transaction
    public Transaction generateTransaction() {

        Transaction txn = new Transaction();

        txn.setTransactionId(UUID.randomUUID().toString());
        txn.setAccountNumber(String.valueOf(100000 + random.nextInt(900000)));
        txn.setTransactionType(random.nextBoolean() ? "CREDIT" : "DEBIT");
        txn.setAmount(1000 + random.nextDouble() * 100000);
        txn.setLocation("City-" + random.nextInt(5));
        txn.setDeviceId("Device-" + random.nextInt(3));
        txn.setCreatedAt(LocalDateTime.now());
        txn.setStatus("NORMAL");

        return repository.save(txn);
    }

    // Generate multiple transactions
    public List<Transaction> generateBulkTransactions(int count) {

        List<Transaction> transactions = new ArrayList<>();

        for (int i = 0; i < count; i++) {

            Transaction txn = new Transaction();

            txn.setTransactionId(UUID.randomUUID().toString());
            txn.setAccountNumber(String.valueOf(100000 + random.nextInt(900000)));
            txn.setTransactionType(random.nextBoolean() ? "CREDIT" : "DEBIT");
            txn.setAmount(1000 + random.nextDouble() * 100000);
            txn.setLocation("City-" + random.nextInt(5));
            txn.setDeviceId("Device-" + random.nextInt(3));
            txn.setCreatedAt(LocalDateTime.now());
            txn.setStatus("NORMAL");

            transactions.add(txn);
        }

        return repository.saveAll(transactions);
    }
}
