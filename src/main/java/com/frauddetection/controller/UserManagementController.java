package com.frauddetection.controller;

import com.frauddetection.entity.AuditLog;
import com.frauddetection.entity.User;
import com.frauddetection.repository.UserRepository;
import com.frauddetection.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserManagementController {

    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll()
                .stream()
                .map(this::toSafeMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<Map<String, Object>> toggleStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails currentUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prevent admin from deactivating themselves
        if (user.getUsername().equals(currentUser.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Cannot deactivate your own account"));
        }

        user.setActive(!user.isActive());
        userRepository.save(user);

        AuditLog.AuditAction action = user.isActive()
                ? AuditLog.AuditAction.USER_ACTIVATED
                : AuditLog.AuditAction.USER_DEACTIVATED;

        auditLogService.log(
                currentUser.getUsername(), "ADMIN", action,
                "USER", String.valueOf(id),
                (user.isActive() ? "Activated" : "Deactivated") + " user: " + user.getUsername()
        );

        return ResponseEntity.ok(toSafeMap(user));
    }

    @PutMapping("/{id}/change-role")
    public ResponseEntity<Map<String, Object>> changeRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal UserDetails currentUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newRoleStr = body.getOrDefault("role", "ANALYST").toUpperCase();
        User.Role newRole;
        try {
            newRole = User.Role.valueOf(newRoleStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid role: " + newRoleStr));
        }

        String oldRole = user.getRole().name();
        user.setRole(newRole);
        userRepository.save(user);

        auditLogService.log(
                currentUser.getUsername(), "ADMIN",
                AuditLog.AuditAction.USER_CREATED,
                "USER", String.valueOf(id),
                "Changed role of " + user.getUsername() + " from " + oldRole + " to " + newRole
        );

        return ResponseEntity.ok(toSafeMap(user));
    }

    // Returns user data WITHOUT the password field
    private Map<String, Object> toSafeMap(User u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id",        u.getId());
        m.put("username",  u.getUsername());
        m.put("email",     u.getEmail());
        m.put("role",      u.getRole().name());
        m.put("active",    u.isActive());
        m.put("createdAt", u.getCreatedAt());
        m.put("lastLogin", u.getLastLogin());
        return m;
    }
}
