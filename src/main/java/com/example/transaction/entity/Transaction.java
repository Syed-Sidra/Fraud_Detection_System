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
    private String accountNumber;
    private String transactionType; // CREDIT / DEBIT
    private Double amount;
    private String location;
    private String deviceId;
    private LocalDateTime createdAt;
    private String status; // NORMAL / SUSPICIOUS
}
