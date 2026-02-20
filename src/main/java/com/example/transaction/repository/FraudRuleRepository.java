package com.example.transaction.repository;

import com.example.transaction.entity.FraudRule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FraudRuleRepository
        extends JpaRepository<FraudRule, Long> {
}
