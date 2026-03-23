package com.example.transaction.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transactionId;

    private String senderName;
    private String senderAccount;

    private String receiverName;
    private String receiverAccount;

    private String transactionType;
    private double amount;

    private String channel;
    private String location;

    private int riskScore;
    private String status;

    private String deviceId;
    private String ipAddress;
    private int failedAttempts;

    private LocalDateTime createdAt;
}