package com.frauddetection.service;

import com.frauddetection.dto.*;
import com.frauddetection.entity.Transaction;
import com.frauddetection.entity.FraudAlert;
import com.frauddetection.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final FraudAlertRepository alertRepository;
    private final AlertService alertService;

    public DashboardStatsDto getStats() {
        long total = transactionRepository.count();
        long fraudCount = transactionRepository.countByFraudStatus(Transaction.FraudStatus.FRAUD);
        long suspiciousCount = transactionRepository.countByFraudStatus(Transaction.FraudStatus.SUSPICIOUS);
        long normalCount = total - fraudCount - suspiciousCount;
        double fraudPct = total > 0 ? (fraudCount * 100.0 / total) : 0;

        long unreadAlerts = alertRepository.countByReadFalse();
        long unresolvedAlerts = alertRepository.countByResolved(false);
        long criticalAlerts = alertRepository.countActiveAlertsBySeverity(FraudAlert.Severity.CRITICAL);
        long highAlerts = alertRepository.countActiveAlertsBySeverity(FraudAlert.Severity.HIGH);

        // 30-day trend
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        List<Object[]> rawTrend = transactionRepository.getDailyFraudTrend(thirtyDaysAgo);
        List<Map<String, Object>> trend = rawTrend.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("date", r[0].toString());
            m.put("total", r[1]);
            m.put("fraud", r[2]);
            return m;
        }).collect(Collectors.toList());

        List<Object[]> rawCat = transactionRepository.getFraudByCategory();
        List<Map<String, Object>> byCategory = rawCat.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("category", r[0]);
            m.put("count", r[1]);
            return m;
        }).collect(Collectors.toList());

        List<TransactionDto> recent = transactionRepository.findTop20ByOrderByTimestampDesc()
            .stream().map(TransactionDto::from).collect(Collectors.toList());

        return DashboardStatsDto.builder()
            .totalTransactions(total)
            .fraudCount(fraudCount)
            .suspiciousCount(suspiciousCount)
            .normalCount(normalCount)
            .fraudPercentage(Math.round(fraudPct * 100.0) / 100.0)
            .activeAlerts(unresolvedAlerts)
            .unresolvedAlerts(unresolvedAlerts)
            .unreadAlerts(unreadAlerts)
            .criticalAlerts(criticalAlerts)
            .highAlerts(highAlerts)
            .dailyFraudTrend(trend)
            .fraudByCategory(byCategory)
            .alertsByRule(alertService.getAlertsByRuleStats())
            .alertsBySeverity(alertService.getAlertsBySeverityStats())
            .recentTransactions(recent)
            .recentAlerts(alertService.getRecentAlerts())
            .build();
    }
}
