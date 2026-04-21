package com.frauddetection.controller;

import com.frauddetection.entity.AuditLog;
import com.frauddetection.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    // Admin only — full audit log
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) AuditLog.AuditAction action) {

        Page<AuditLog> result;
        if (username != null && !username.isBlank()) {
            result = auditLogService.getByUsername(username, page, size);
        } else if (action != null) {
            result = auditLogService.getByAction(action, page, size);
        } else {
            result = auditLogService.getAll(page, size);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", result.getContent().stream()
                .map(this::toMap).collect(Collectors.toList()));
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", page);
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> toMap(AuditLog a) {
        Map<String, Object> m = new HashMap<>();
        m.put("id",         a.getId());
        m.put("username",   a.getUsername());
        m.put("userRole",   a.getUserRole());
        m.put("action",     a.getAction());
        m.put("entityType", a.getEntityType());
        m.put("entityId",   a.getEntityId());
        m.put("details",    a.getDetails());
        m.put("timestamp",  a.getTimestamp());
        return m;
    }
}
