package com.frauddetection.repository;

import com.frauddetection.entity.FraudAlert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {

    List<FraudAlert> findBySeverity(FraudAlert.Severity severity);

    List<FraudAlert> findByRuleTriggered(String ruleTriggered);

    List<FraudAlert> findByReadFalse();

    long countByReadFalse();

    long countByResolved(boolean resolved);

    Page<FraudAlert> findAllByOrderByAlertTimeDesc(Pageable pageable);

    Page<FraudAlert> findBySeverityOrderByAlertTimeDesc(FraudAlert.Severity severity, Pageable pageable);

    @Modifying
    @Query("UPDATE FraudAlert a SET a.read = true WHERE a.read = false")
    void markAllAsRead();

    @Query("SELECT a.ruleTriggered, COUNT(a) FROM FraudAlert a GROUP BY a.ruleTriggered ORDER BY COUNT(a) DESC")
    List<Object[]> countByRule();

    @Query("SELECT a.severity, COUNT(a) FROM FraudAlert a GROUP BY a.severity")
    List<Object[]> countBySeverity();

    List<FraudAlert> findTop10ByOrderByAlertTimeDesc();

    @Query("SELECT COUNT(a) FROM FraudAlert a WHERE a.resolved = false AND a.severity = :severity")
    long countActiveAlertsBySeverity(@Param("severity") FraudAlert.Severity severity);
}
