package com.frauddetection.controller;

import com.frauddetection.dto.TransactionDto;
import com.frauddetection.entity.Transaction;
import com.frauddetection.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDto> create(@RequestBody Transaction transaction) {
        Transaction saved = transactionService.saveTransaction(transaction);
        return ResponseEntity.ok(TransactionDto.from(saved));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
        @RequestParam(required = false) Transaction.FraudStatus fraudStatus,
        @RequestParam(required = false) BigDecimal minAmount,
        @RequestParam(required = false) BigDecimal maxAmount,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
        @RequestParam(required = false) String accountNumber,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Page<Transaction> txPage = transactionService.getTransactions(
            fraudStatus, minAmount, maxAmount, startDate, endDate, accountNumber, page, size
        );
        Map<String, Object> response = new HashMap<>();
        response.put("content", txPage.getContent().stream().map(TransactionDto::from).collect(Collectors.toList()));
        response.put("totalElements", txPage.getTotalElements());
        response.put("totalPages", txPage.getTotalPages());
        response.put("currentPage", page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionDto> getById(@PathVariable String transactionId) {
        return transactionService.findByTransactionId(transactionId)
            .map(t -> ResponseEntity.ok(TransactionDto.from(t)))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/live-feed")
    public ResponseEntity<List<TransactionDto>> getLiveFeed() {
        return ResponseEntity.ok(
            transactionService.getRecentLiveFeed().stream()
                .map(TransactionDto::from).collect(Collectors.toList())
        );
    }

    @GetMapping("/high-risk-accounts")
    public ResponseEntity<List<Map<String, Object>>> getHighRiskAccounts() {
        List<Object[]> raw = transactionService.getHighRiskAccounts();
        List<Map<String, Object>> result = raw.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("accountNumber", r[0]);
            m.put("fraudCount", r[1]);
            return m;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
