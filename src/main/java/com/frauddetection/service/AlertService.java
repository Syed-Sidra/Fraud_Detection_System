package com.frauddetection.service;

import com.frauddetection.dto.AlertDto;
import com.frauddetection.entity.FraudAlert;
import com.frauddetection.repository.FraudAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final FraudAlertRepository alertRepository;

    public Page<AlertDto> getAlerts(FraudAlert.Severity severity, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FraudAlert> alerts = (severity != null)
            ? alertRepository.findBySeverityOrderByAlertTimeDesc(severity, pageable)
            : alertRepository.findAllByOrderByAlertTimeDesc(pageable);
        return alerts.map(AlertDto::from);
    }

    public List<AlertDto> getHighRiskAlerts() {
        List<FraudAlert> high = alertRepository.findBySeverity(FraudAlert.Severity.HIGH);
        List<FraudAlert> critical = alertRepository.findBySeverity(FraudAlert.Severity.CRITICAL);
        high.addAll(critical);
        high.sort(Comparator.comparing(FraudAlert::getAlertTime).reversed());
        return high.stream().map(AlertDto::from).collect(Collectors.toList());
    }

    public List<AlertDto> getAlertsByRule(String rule) {
        return alertRepository.findByRuleTriggered(rule)
            .stream().map(AlertDto::from).collect(Collectors.toList());
    }

    public long getUnreadCount() {
        return alertRepository.countByReadFalse();
    }

    @Transactional
    public void markAllRead() {
        alertRepository.markAllAsRead();
    }

    @Transactional
    public AlertDto resolveAlert(Long id, String note) {
        FraudAlert alert = alertRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alert not found"));
        alert.setResolved(true);
        alert.setRead(true);
        alert.setResolutionNote(note);
        alert.setResolvedAt(LocalDateTime.now());
        return AlertDto.from(alertRepository.save(alert));
    }

    public List<Map<String, Object>> getAlertsByRuleStats() {
        List<Object[]> raw = alertRepository.countByRule();
        return raw.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("rule", r[0]);
            m.put("count", r[1]);
            return m;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAlertsBySeverityStats() {
        List<Object[]> raw = alertRepository.countBySeverity();
        return raw.stream().map(r -> {
            Map<String, Object> m = new HashMap<>();
            m.put("severity", r[0]);
            m.put("count", r[1]);
            return m;
        }).collect(Collectors.toList());
    }

    public List<AlertDto> getRecentAlerts() {
        return alertRepository.findTop10ByOrderByAlertTimeDesc()
            .stream().map(AlertDto::from).collect(Collectors.toList());
    }
}
