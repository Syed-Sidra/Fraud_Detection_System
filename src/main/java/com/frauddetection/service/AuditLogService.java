package com.frauddetection.service;

import com.frauddetection.entity.AuditLog;
import com.frauddetection.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    /**
     * Called from controllers to log user actions.
     * Runs @Async so it never slows down the actual response.
     */
    @Async
    public void log(String username, String role,
                    AuditLog.AuditAction action,
                    String entityType, String entityId, String details) {
        try {
            AuditLog entry = AuditLog.builder()
                    .username(username)
                    .userRole(role)
                    .action(action)
                    .entityType(entityType)
                    .entityId(entityId)
                    .details(details)
                    .build();
            auditLogRepository.save(entry);
        } catch (Exception e) {
            log.error("Failed to write audit log: {}", e.getMessage());
        }
    }

    public Page<AuditLog> getAll(int page, int size) {
        return auditLogRepository.findAllByOrderByTimestampDesc(
                PageRequest.of(page, size));
    }

    public Page<AuditLog> getByUsername(String username, int page, int size) {
        return auditLogRepository.findByUsernameOrderByTimestampDesc(
                username, PageRequest.of(page, size));
    }

    public Page<AuditLog> getByAction(AuditLog.AuditAction action, int page, int size) {
        return auditLogRepository.findByActionOrderByTimestampDesc(
                action, PageRequest.of(page, size));
    }
}
