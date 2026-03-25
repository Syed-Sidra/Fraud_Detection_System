package com.frauddetection.controller;

import com.frauddetection.dto.DashboardStatsDto;
import com.frauddetection.service.DashboardService;
import com.frauddetection.service.SimulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DashboardAndSimulationController {

    private final DashboardService dashboardService;
    private final SimulationService simulationService;

    // ========================
    // DASHBOARD
    // ========================
    @GetMapping("/api/dashboard/stats")
    public ResponseEntity<DashboardStatsDto> getStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    // ========================
    // SIMULATION
    // ========================
    @PostMapping("/api/simulation/start")
    public ResponseEntity<Map<String, Object>> startSimulation(@RequestBody(required = false) Map<String, String> body) {
        String scenario = body != null ? body.getOrDefault("scenario", "MIXED") : "MIXED";
        simulationService.startSimulation(scenario);
        return ResponseEntity.ok(Map.of("status", "STARTED", "scenario", scenario));
    }

    @PostMapping("/api/simulation/stop")
    public ResponseEntity<Map<String, String>> stopSimulation() {
        simulationService.stopSimulation();
        return ResponseEntity.ok(Map.of("status", "STOPPED"));
    }

    @GetMapping("/api/simulation/status")
    public ResponseEntity<Map<String, Object>> getSimulationStatus() {
        return ResponseEntity.ok(Map.of(
            "running", simulationService.isRunning(),
            "scenario", simulationService.getCurrentScenario()
        ));
    }

    @PostMapping("/api/simulation/bulk")
    public ResponseEntity<Map<String, Object>> generateBulk(@RequestBody Map<String, Object> body) {
        int count = (Integer) body.getOrDefault("count", 10);
        String scenario = (String) body.getOrDefault("scenario", "MIXED");
        simulationService.generateBulk(count, scenario);
        return ResponseEntity.ok(Map.of("generated", count, "scenario", scenario));
    }
}
