package com.frauddetection.repository;

import com.frauddetection.entity.SimulationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SimulationLogRepository extends JpaRepository<SimulationLog, Long> {
    Optional<SimulationLog> findByActiveTrue();
}
