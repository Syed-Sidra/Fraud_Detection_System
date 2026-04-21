package com.frauddetection.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "user_role")
    private String userRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private AuditAction action;

    @Column(name = "entity_type")
    private String entityType;   // "ALERT", "TRANSACTION", "USER", "SIMULATION"

    @Column(name = "entity_id")
    private String entityId;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }

    public enum AuditAction {
        ALERT_RESOLVED,
        ALERT_READ,
        ALERTS_MARKED_READ,
        SIMULATION_STARTED,
        SIMULATION_STOPPED,
        BULK_GENERATED,
        ML_MODEL_TRAINED,
        USER_CREATED,
        USER_DEACTIVATED,
        USER_ACTIVATED,
        EXPORT_CSV,
        LOGIN,
        LOGOUT
    }
}
