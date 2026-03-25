package com.frauddetection.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id", unique = true, nullable = false)
    private String transactionId;

    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "merchant_name")
    private String merchantName;

    @Column(name = "merchant_category")
    private String merchantCategory;

    @Column(name = "location")
    private String location;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "device_type")
    private String deviceType;

    @Column(name = "transaction_type")
    private String transactionType;  // DEBIT, CREDIT, TRANSFER

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TransactionStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "fraud_status")
    private FraudStatus fraudStatus;

    @Column(name = "risk_score")
    private Double riskScore;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "is_simulated")
    private boolean simulated;

    @Column(name = "previous_location")
    private String previousLocation;

    @Column(name = "failed_attempts")
    private Integer failedAttempts;

    public enum TransactionStatus {
        SUCCESS, PROCESSING, FAILED
    }

    public enum FraudStatus {
        NORMAL, SUSPICIOUS, FRAUD
    }
}
