package com.frauddetection.controller;

import com.frauddetection.service.MlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@RestController
@RequestMapping("/api/ml")
@RequiredArgsConstructor
public class MlController {

    private final MlService mlService;

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlUrl;

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        boolean available = mlService.isAvailable();
        return ResponseEntity.ok(Map.of(
            "available", available,
            "mlServiceUrl", mlUrl,
            "message", available ? "ML service is running" : "ML service is offline"
        ));
    }

    @PostMapping("/train")
    public ResponseEntity<?> trainModel() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> resp = restTemplate.postForEntity(mlUrl + "/train", null, Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of("error", "ML service unavailable: " + e.getMessage()));
        }
    }

    @GetMapping("/info")
    public ResponseEntity<?> modelInfo() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> resp = restTemplate.getForEntity(mlUrl + "/model/info", Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of("error", "ML service unavailable"));
        }
    }
}
