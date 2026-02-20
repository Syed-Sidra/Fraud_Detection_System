package com.example.transaction.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "fraud_rules")
@Data
public class FraudRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ruleName;
    private String description;
    private Double thresholdAmount;
    private String riskLevel;
}
