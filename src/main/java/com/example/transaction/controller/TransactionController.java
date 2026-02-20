package com.example.transaction.controller;

import com.example.transaction.entity.Transaction;
import com.example.transaction.service.TransactionGeneratorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionGeneratorService service;

    public TransactionController(TransactionGeneratorService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public Transaction generateSingle() {
        return service.generateTransaction();
    }

    @PostMapping("/generate/bulk")
    public List<Transaction> generateBulk(
            @RequestParam int count) {

        return service.generateBulkTransactions(count);
    }
}
