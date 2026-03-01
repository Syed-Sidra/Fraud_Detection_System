package com.example.transaction.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionId;
    private String ruleTriggered;
    private String riskLevel;
    private Integer riskScore;  // NEW
    private LocalDateTime createdAt;
}