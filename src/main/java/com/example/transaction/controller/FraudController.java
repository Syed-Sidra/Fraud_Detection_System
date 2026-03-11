package com.example.transaction.controller;

import com.example.transaction.model.Transaction;
import com.example.transaction.model.FraudResponse;
import com.example.transaction.service.FraudDetectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fraud")
public class FraudController {

    @Autowired
    private FraudDetectionService fraudDetectionService;

    @PostMapping("/check")
    public FraudResponse checkFraud(@RequestBody Transaction transaction) {

        return fraudDetectionService.detectFraud(transaction);
    }
}