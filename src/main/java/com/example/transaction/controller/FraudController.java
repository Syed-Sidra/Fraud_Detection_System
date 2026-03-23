package com.example.transaction.controller;

import com.example.transaction.entity.Transaction;
import com.example.transaction.service.FraudDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/fraud")
@CrossOrigin(origins = "http://localhost:4200")
public class FraudController {

    @Autowired
    private FraudDetectionService fraudDetectionService;

    private final List<Transaction> transactions = new ArrayList<>();

    @PostMapping("/check")
    public Transaction checkFraud(@RequestBody Transaction transaction) {

        fraudDetectionService.evaluateTransaction(transaction);

        transaction.setId((long) (transactions.size() + 1));
        transaction.setTransactionId("TXN" + String.format("%06d", transactions.size() + 1));
       // transaction.setCreatedAt();

        transactions.add(transaction);

        return transaction;
    }

    @GetMapping("/transactions")
    public List<Transaction> getFraudTransactions() {
        return transactions;
    }
}