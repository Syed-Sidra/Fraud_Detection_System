package com.frauddetection.repository;

import com.frauddetection.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByTransactionId(String transactionId);

    List<Transaction> findByAccountNumber(String accountNumber);

    List<Transaction> findByFraudStatus(Transaction.FraudStatus fraudStatus);

    List<Transaction> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    long countByFraudStatus(Transaction.FraudStatus fraudStatus);

    long countByTimestampBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT t FROM Transaction t WHERE t.accountNumber = :accountNumber ORDER BY t.timestamp DESC")
    List<Transaction> findRecentByAccount(@Param("accountNumber") String accountNumber, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.timestamp >= :since AND t.accountNumber = :account ORDER BY t.timestamp ASC")
    List<Transaction> findTransactionsAfter(@Param("account") String account, @Param("since") LocalDateTime since);

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.accountNumber = :account AND t.timestamp >= :since")
    long countRecentTransactions(@Param("account") String account, @Param("since") LocalDateTime since);

    @Query("SELECT t FROM Transaction t WHERE " +
           "(:fraudStatus IS NULL OR t.fraudStatus = :fraudStatus) AND " +
           "(:minAmount IS NULL OR t.amount >= :minAmount) AND " +
           "(:maxAmount IS NULL OR t.amount <= :maxAmount) AND " +
           "(:startDate IS NULL OR t.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR t.timestamp <= :endDate) AND " +
           "(:accountNumber IS NULL OR t.accountNumber LIKE %:accountNumber%) " +
           "ORDER BY t.timestamp DESC")
    Page<Transaction> findWithFilters(
        @Param("fraudStatus") Transaction.FraudStatus fraudStatus,
        @Param("minAmount") BigDecimal minAmount,
        @Param("maxAmount") BigDecimal maxAmount,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        @Param("accountNumber") String accountNumber,
        Pageable pageable
    );

    @Query("SELECT DATE(t.timestamp) as date, COUNT(t) as total, SUM(CASE WHEN t.fraudStatus = 'FRAUD' THEN 1 ELSE 0 END) as fraud FROM Transaction t WHERE t.timestamp >= :since GROUP BY DATE(t.timestamp) ORDER BY date ASC")
    List<Object[]> getDailyFraudTrend(@Param("since") LocalDateTime since);

    @Query("SELECT t.merchantCategory, COUNT(t) FROM Transaction t WHERE t.fraudStatus = 'FRAUD' GROUP BY t.merchantCategory ORDER BY COUNT(t) DESC")
    List<Object[]> getFraudByCategory();

    List<Transaction> findTop20ByOrderByTimestampDesc();

    @Query("SELECT t.accountNumber, COUNT(t) as cnt FROM Transaction t WHERE t.fraudStatus = 'FRAUD' GROUP BY t.accountNumber ORDER BY cnt DESC")
    List<Object[]> getHighRiskAccounts(Pageable pageable);
}
