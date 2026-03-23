package com.example.transaction.controller;

import com.example.transaction.entity.Transaction;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/fraud")
@CrossOrigin(origins = "http://localhost:4200")
public class FraudAnalyticsController {

    @GetMapping("/merchants")
    public List<Transaction> getMerchants() {

        List<Transaction> list = new ArrayList<>();

        for (int i = 1; i <= 10; i++) {
            Transaction t = new Transaction();

            t.setId((long) i);
            t.setTransactionId("TXN" + String.format("%06d", i));
            t.setSenderName("Customer " + i);
            t.setSenderAccount("ACC10" + i);
            t.setReceiverName("Merchant " + i);
            t.setReceiverAccount("ACC50" + i);
            t.setTransactionType(i % 2 == 0 ? "DEBIT" : "CREDIT");
            t.setAmount(500 + i * 100);
            t.setChannel("POS");
            t.setLocation("India");
            t.setRiskScore(60 + i);
            t.setStatus("FRAUD");
            t.setDeviceId("DEV20" + i);
            t.setIpAddress("192.168.1." + i);
            t.setFailedAttempts(i % 3);
//            t.setCreatedAt(new LocalDateTime());

            list.add(t);
        }

        return list;
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("fraudulentTransactions", 19);
        stats.put("fraudPercentage", 0.034);
        stats.put("totalFraudAmount", 10000);
        stats.put("highRiskCount", 7);

        return stats;
    }

    @GetMapping("/categories")
    public List<Map<String, Object>> getCategoryFraud() {

        List<Map<String, Object>> list = new ArrayList<>();

        list.add(createCategory("grocery_net", 10));
        list.add(createCategory("grocery_pos", 10));
        list.add(createCategory("misc_net", 7));
        list.add(createCategory("shopping_net", 7));
        list.add(createCategory("shopping_pos", 6));
        list.add(createCategory("gas_transport", 4));
        list.add(createCategory("entertainment", 3));
        list.add(createCategory("food_dining", 2));
        list.add(createCategory("health_fitness", 1));
        list.add(createCategory("travel", 1));

        return list;
    }

    @GetMapping("/daily")
    public List<Map<String, Object>> getDailyFraud() {

        List<Map<String, Object>> list = new ArrayList<>();

        for (int i = 20; i <= 31; i++) {
            Map<String, Object> data = new HashMap<>();
            data.put("date", "Dec " + i);
            data.put("avgPercentage", Math.round(Math.random() * 10.0) / 100.0);
            data.put("highRisk", new Random().nextInt(100));
            data.put("mediumRisk", new Random().nextInt(100));

            list.add(data);
        }

        return list;
    }

    private Map<String, Object> createCategory(String name, int percentage) {
        Map<String, Object> map = new HashMap<>();
        map.put("category", name);
        map.put("percentage", percentage);
        return map;
    }
}