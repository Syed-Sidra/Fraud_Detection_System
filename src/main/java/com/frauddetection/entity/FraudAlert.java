package com.frauddetection.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FraudAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── Transaction reference ─────────────────────────────────────────────
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id_fk")
    private Transaction transaction;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "merchant_name")
    private String merchantName;

    @Column(name = "location")
    private String location;

    // ── Rule engine fields ────────────────────────────────────────────────
    @Column(name = "rule_triggered")
    private String ruleTriggered;

    @Column(name = "fraud_reason", columnDefinition = "TEXT")
    private String fraudReason;

    @Column(name = "risk_score")
    private Double riskScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity", nullable = false)
    private Severity severity;

    // ── Voting Ensemble ML fields ─────────────────────────────────────────
    @Column(name = "ml_prediction")
    private Boolean mlPrediction;

    @Column(name = "ml_confidence")
    private Double mlConfidence;

    @Column(name = "ml_fraud_probability")
    private Double mlFraudProbability;

    // Individual classifier probabilities (for ML Insights comparison table)
    @Column(name = "ml_rf_probability")
    private Double mlRfProbability;      // Random Forest probability

    @Column(name = "ml_gb_probability")
    private Double mlGbProbability;      // Gradient Boosting probability

    @Column(name = "ml_lr_probability")
    private Double mlLrProbability;      // Logistic Regression probability

    @Column(name = "ml_model_used")
    private String mlModelUsed;          // e.g. "VotingEnsemble (RF:0.4 + GB:0.4 + LR:0.2)"

    // ── Alert lifecycle ───────────────────────────────────────────────────
    @Column(name = "alert_time")
    private LocalDateTime alertTime;

    @Column(name = "is_read")
    private boolean read;

    @Column(name = "is_resolved")
    private boolean resolved;

    @Column(name = "resolution_note", columnDefinition = "TEXT")
    private String resolutionNote;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "email_sent")
    private boolean emailSent;

    @PrePersist
    public void prePersist() {
        if (alertTime == null) alertTime = LocalDateTime.now();
    }

    public enum Severity {
        LOW, MEDIUM, HIGH, CRITICAL
    }
}
