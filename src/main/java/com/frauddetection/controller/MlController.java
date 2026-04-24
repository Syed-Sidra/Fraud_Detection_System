package com.frauddetection.controller;

import com.frauddetection.service.MlService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/ml")
@RequiredArgsConstructor
public class MlController {

    private final MlService mlService;

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlUrl;

    // ── Both roles: check ML service health ───────────────────────────────
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        boolean available = mlService.isAvailable();
        return ResponseEntity.ok(Map.of(
                "available",   available,
                "mlServiceUrl", mlUrl,
                "modelType",   "VotingEnsemble (RF + GB + LR)",
                "message",     available
                        ? "ML Voting Ensemble service is running"
                        : "ML service is offline — rule engine still active"
        ));
    }

    // ── Both roles: model info (accuracy, features, etc.) ────────────────
    @GetMapping("/info")
    public ResponseEntity<?> modelInfo() {
        try {
            RestTemplate rt = new RestTemplate();
            ResponseEntity<Map> resp = rt.getForEntity(mlUrl + "/model/info", Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(503)
                    .body(Map.of("error", "ML service unavailable", "loaded", false));
        }
    }

    // ── Both roles: ensemble vs individual classifier comparison ──────────
    @GetMapping("/compare")
    public ResponseEntity<?> compare() {
        try {
            RestTemplate rt = new RestTemplate();
            ResponseEntity<Map> resp = rt.getForEntity(mlUrl + "/compare", Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(503)
                    .body(Map.of("error", "ML service unavailable"));
        }
    }

    // ── Admin only: retrain the Voting Ensemble ───────────────────────────
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/train")
    public ResponseEntity<?> trainModel() {
        try {
            RestTemplate rt = new RestTemplate();
            ResponseEntity<Map> resp = rt.postForEntity(mlUrl + "/train", null, Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(503)
                    .body(Map.of("error", "ML service unavailable: " + e.getMessage()));
        }
    }
}
