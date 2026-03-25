package com.frauddetection.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalTransactions;
    private long fraudCount;
    private long suspiciousCount;
    private long normalCount;
    private double fraudPercentage;
    private long activeAlerts;
    private long unresolvedAlerts;
    private long unreadAlerts;
    private long criticalAlerts;
    private long highAlerts;

    private List<Map<String, Object>> dailyFraudTrend;
    private List<Map<String, Object>> fraudByCategory;
    private List<Map<String, Object>> alertsByRule;
    private List<Map<String, Object>> alertsBySeverity;
    private List<TransactionDto> recentTransactions;
    private List<AlertDto> recentAlerts;
}
