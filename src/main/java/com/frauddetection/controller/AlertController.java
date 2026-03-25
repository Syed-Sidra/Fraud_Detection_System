package com.frauddetection.controller;

import com.frauddetection.dto.AlertDto;
import com.frauddetection.entity.FraudAlert;
import com.frauddetection.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertService alertService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAlerts(
        @RequestParam(required = false) FraudAlert.Severity severity,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Page<AlertDto> alertPage = alertService.getAlerts(severity, page, size);
        Map<String, Object> response = new HashMap<>();
        response.put("content", alertPage.getContent());
        response.put("totalElements", alertPage.getTotalElements());
        response.put("totalPages", alertPage.getTotalPages());
        response.put("currentPage", page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/high-risk")
    public ResponseEntity<List<AlertDto>> getHighRisk() {
        return ResponseEntity.ok(alertService.getHighRiskAlerts());
    }

    @GetMapping("/by-rule/{rule}")
    public ResponseEntity<List<AlertDto>> getByRule(@PathVariable String rule) {
        return ResponseEntity.ok(alertService.getAlertsByRule(rule));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        return ResponseEntity.ok(Map.of("count", alertService.getUnreadCount()));
    }

    @PutMapping("/mark-all-read")
    public ResponseEntity<Void> markAllRead() {
        alertService.markAllRead();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<AlertDto> resolve(@PathVariable Long id,
                                             @RequestBody Map<String, String> body) {
        String note = body.getOrDefault("note", "Resolved by analyst");
        return ResponseEntity.ok(alertService.resolveAlert(id, note));
    }

    @GetMapping("/stats/by-rule")
    public ResponseEntity<List<Map<String, Object>>> statsByRule() {
        return ResponseEntity.ok(alertService.getAlertsByRuleStats());
    }

    @GetMapping("/stats/by-severity")
    public ResponseEntity<List<Map<String, Object>>> statsBySeverity() {
        return ResponseEntity.ok(alertService.getAlertsBySeverityStats());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<AlertDto>> getRecent() {
        return ResponseEntity.ok(alertService.getRecentAlerts());
    }
}
