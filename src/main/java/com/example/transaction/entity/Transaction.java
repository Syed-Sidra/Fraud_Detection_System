package com.example.transaction.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionId;

    // Sender Details
    private String senderName;
    private String senderAccount;

    // Receiver Details
    private String receiverName;
    private String receiverAccount;

    private String transactionType;   // CREDIT / DEBIT
    private Double amount;
    private String channel;           // ATM / ONLINE / UPI / POS
    private String location;
    private String deviceId;
    private String ipAddress;
    private Integer failedAttempts;

    private String status;            // NORMAL / SUSPICIOUS / FRAUD
    private Integer riskScore;

    private LocalDateTime createdAt;
}