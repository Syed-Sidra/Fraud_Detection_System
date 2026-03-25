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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Column(name = "rule_triggered", nullable = false)
    private String ruleTriggered;

    @Column(name = "fraud_reason", columnDefinition = "TEXT")
    private String fraudReason;

    @Column(name = "risk_score", nullable = false)
    private Double riskScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "severity", nullable = false)
    private Severity severity;

    @Column(name = "is_read")
    private boolean read;

    @Column(name = "is_resolved")
    private boolean resolved;

    @Column(name = "resolution_note", columnDefinition = "TEXT")
    private String resolutionNote;

    @Column(name = "alert_time", nullable = false)
    private LocalDateTime alertTime;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "email_sent")
    private boolean emailSent;

    @Column(name = "ml_prediction")
    private Boolean mlPrediction;

    @Column(name = "ml_confidence")
    private Double mlConfidence;

    @PrePersist
    public void prePersist() {
        this.alertTime = LocalDateTime.now();
    }

    public enum Severity {
        LOW, MEDIUM, HIGH, CRITICAL
    }
}
