package com.frauddetection.dto;

import com.frauddetection.entity.Transaction;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private Long id;
    private String transactionId;
    private String accountNumber;
    private String userName;
    private BigDecimal amount;
    private String merchantName;
    private String merchantCategory;
    private String location;
    private String ipAddress;
    private String deviceType;
    private String transactionType;
    private Transaction.TransactionStatus status;
    private Transaction.FraudStatus fraudStatus;
    private Double riskScore;
    private LocalDateTime timestamp;
    private boolean simulated;

    public static TransactionDto from(Transaction t) {
        return TransactionDto.builder()
            .id(t.getId())
            .transactionId(t.getTransactionId())
            .accountNumber(t.getAccountNumber())
            .userName(t.getUserName())
            .amount(t.getAmount())
            .merchantName(t.getMerchantName())
            .merchantCategory(t.getMerchantCategory())
            .location(t.getLocation())
            .ipAddress(t.getIpAddress())
            .deviceType(t.getDeviceType())
            .transactionType(t.getTransactionType())
            .status(t.getStatus())
            .fraudStatus(t.getFraudStatus())
            .riskScore(t.getRiskScore())
            .timestamp(t.getTimestamp())
            .simulated(t.isSimulated())
            .build();
    }
}
