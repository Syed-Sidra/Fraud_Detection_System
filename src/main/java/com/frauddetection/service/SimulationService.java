package com.frauddetection.service;

import com.frauddetection.entity.Transaction;
import com.frauddetection.entity.SimulationLog;
import com.frauddetection.repository.SimulationLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@RequiredArgsConstructor
@Slf4j
public class SimulationService {

    private final TransactionService transactionService;
    private final SimulationLogRepository simulationLogRepository;

    private final AtomicBoolean running = new AtomicBoolean(false);
    private String currentScenario = "MIXED";

    private static final Random RANDOM = new Random();

    private static final String[] ACCOUNTS = {
        "ACC001", "ACC002", "ACC003", "ACC004", "ACC005",
        "ACC006", "ACC007", "ACC008", "ACC009", "ACC010"
    };
    private static final String[] MERCHANTS = {
        "Amazon India", "Flipkart", "Swiggy", "Zomato", "BigBasket",
        "Netflix", "Hotstar", "PhonePe", "Paytm", "IRCTC",
        "Casino Royal", "CryptoExchange", "GamblingHub"
    };
    private static final String[] CATEGORIES = {
        "ECOMMERCE", "FOOD", "ENTERTAINMENT", "TRAVEL", "UTILITIES",
        "GAMBLING", "CRYPTO", "RETAIL", "HEALTHCARE"
    };
    private static final String[] LOCATIONS = {
        "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
        "Hyderabad", "Pune", "Ahmedabad", "London", "Dubai"
    };
    private static final String[] DEVICES = {"MOBILE", "DESKTOP", "TABLET", "ATM"};
    private static final String[] NAMES = {
        "Rahul Sharma", "Priya Singh", "Amit Kumar", "Neha Gupta",
        "Vikram Patel", "Anjali Verma", "Rajesh Nair", "Sunita Joshi"
    };

    public void startSimulation(String scenario) {
        if (running.compareAndSet(false, true)) {
            currentScenario = scenario != null ? scenario : "MIXED";
            SimulationLog simLog = SimulationLog.builder()
                .scenarioName(currentScenario)
                .transactionsGenerated(0)
                .fraudCount(0)
                .startTime(LocalDateTime.now())
                .active(true)
                .build();
            simulationLogRepository.save(simLog);
            log.info("Simulation started: scenario={}", currentScenario);
        }
    }

    public void stopSimulation() {
        running.set(false);
        simulationLogRepository.findByActiveTrue().ifPresent(simLog -> {
            simLog.setActive(false);
            simLog.setEndTime(LocalDateTime.now());
            simulationLogRepository.save(simLog);
        });
        log.info("Simulation stopped");
    }

    public boolean isRunning() {
        return running.get();
    }

    public String getCurrentScenario() {
        return currentScenario;
    }

    @Scheduled(fixedDelayString = "${simulation.interval-ms:3000}")
    public void runSimulationTick() {
        if (!running.get()) return;
        try {
            Transaction txn = generateTransaction(currentScenario);
            transactionService.saveTransaction(txn);
        } catch (Exception e) {
            log.error("Error in simulation tick: {}", e.getMessage());
        }
    }

    public void generateBulk(int count, String scenario) {
        for (int i = 0; i < count; i++) {
            try {
                Transaction txn = generateTransaction(scenario != null ? scenario : "MIXED");
                transactionService.saveTransaction(txn);
            } catch (Exception e) {
                log.error("Error generating bulk transaction: {}", e.getMessage());
            }
        }
    }

    private Transaction generateTransaction(String scenario) {
        return switch (scenario) {
            case "HIGH_VALUE" -> buildHighValueTransaction();
            case "RAPID" -> buildRapidTransaction();
            case "ODD_HOURS" -> buildOddHoursTransaction();
            case "SUSPICIOUS_MERCHANT" -> buildSuspiciousMerchantTransaction();
            case "LOCATION_MISMATCH" -> buildLocationMismatchTransaction();
            case "NORMAL" -> buildNormalTransaction();
            default -> RANDOM.nextInt(10) < 3 ? buildFraudTransaction() : buildNormalTransaction();
        };
    }

    private Transaction buildNormalTransaction() {
        String account = ACCOUNTS[RANDOM.nextInt(ACCOUNTS.length)];
        String location = LOCATIONS[RANDOM.nextInt(5)]; // Domestic only
        return Transaction.builder()
            .accountNumber(account)
            .userName(NAMES[RANDOM.nextInt(NAMES.length)])
            .amount(randomAmount(100, 5000))
            .merchantName(MERCHANTS[RANDOM.nextInt(10)])
            .merchantCategory(CATEGORIES[RANDOM.nextInt(5)])
            .location(location)
            .previousLocation(location)
            .ipAddress("192.168." + RANDOM.nextInt(255) + "." + RANDOM.nextInt(255))
            .deviceType(DEVICES[RANDOM.nextInt(DEVICES.length)])
            .transactionType("DEBIT")
            .status(Transaction.TransactionStatus.SUCCESS)
            .timestamp(LocalDateTime.now())
            .simulated(true)
            .failedAttempts(0)
            .build();
    }

    private Transaction buildHighValueTransaction() {
        return buildNormalTransaction().toBuilder()
            .amount(randomAmount(15000, 100000))
            .build();
    }

    private Transaction buildRapidTransaction() {
        String account = ACCOUNTS[0]; // Same account for rapid detection
        return buildNormalTransaction().toBuilder()
            .accountNumber(account)
            .timestamp(LocalDateTime.now())
            .build();
    }

    private Transaction buildOddHoursTransaction() {
        return buildNormalTransaction().toBuilder()
            .timestamp(LocalDateTime.now().withHour(2).withMinute(RANDOM.nextInt(60)))
            .build();
    }

    private Transaction buildSuspiciousMerchantTransaction() {
        return buildNormalTransaction().toBuilder()
            .merchantName(MERCHANTS[10 + RANDOM.nextInt(3)])
            .merchantCategory("GAMBLING")
            .amount(randomAmount(5000, 50000))
            .build();
    }

    private Transaction buildLocationMismatchTransaction() {
        return buildNormalTransaction().toBuilder()
            .location(LOCATIONS[8]) // London
            .previousLocation("Mumbai")
            .ipAddress("87.65.43." + RANDOM.nextInt(255)) // International IP
            .build();
    }

    private Transaction buildFraudTransaction() {
        int type = RANDOM.nextInt(5);
        return switch (type) {
            case 0 -> buildHighValueTransaction();
            case 1 -> buildSuspiciousMerchantTransaction();
            case 2 -> buildOddHoursTransaction();
            case 3 -> buildLocationMismatchTransaction();
            default -> buildNormalTransaction().toBuilder()
                .failedAttempts(3 + RANDOM.nextInt(5))
                .amount(randomAmount(8000, 30000))
                .build();
        };
    }

    private BigDecimal randomAmount(int min, int max) {
        return BigDecimal.valueOf(min + RANDOM.nextDouble() * (max - min))
            .setScale(2, RoundingMode.HALF_UP);
    }
}
