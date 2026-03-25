package com.frauddetection.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "simulation_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimulationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "scenario_name")
    private String scenarioName;

    @Column(name = "transactions_generated")
    private Integer transactionsGenerated;

    @Column(name = "fraud_count")
    private Integer fraudCount;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "is_active")
    private boolean active;
}
