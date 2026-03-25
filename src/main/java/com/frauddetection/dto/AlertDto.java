package com.frauddetection.dto;

import com.frauddetection.entity.FraudAlert;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlertDto {
    private Long id;
    private String transactionId;
    private String accountNumber;
    private String userName;
    private BigDecimal amount;
    private String merchantName;
    private String location;
    private String ruleTriggered;
    private String fraudReason;
    private Double riskScore;
    private FraudAlert.Severity severity;
    private boolean read;
    private boolean resolved;
    private String resolutionNote;
    private LocalDateTime alertTime;
    private LocalDateTime resolvedAt;
    private Boolean mlPrediction;
    private Double mlConfidence;
    private LocalDateTime transactionTimestamp;

    public static AlertDto from(FraudAlert a) {
        AlertDto dto = new AlertDto();
        dto.setId(a.getId());
        dto.setRuleTriggered(a.getRuleTriggered());
        dto.setFraudReason(a.getFraudReason());
        dto.setRiskScore(a.getRiskScore());
        dto.setSeverity(a.getSeverity());
        dto.setRead(a.isRead());
        dto.setResolved(a.isResolved());
        dto.setResolutionNote(a.getResolutionNote());
        dto.setAlertTime(a.getAlertTime());
        dto.setResolvedAt(a.getResolvedAt());
        dto.setMlPrediction(a.getMlPrediction());
        dto.setMlConfidence(a.getMlConfidence());
        if (a.getTransaction() != null) {
            dto.setTransactionId(a.getTransaction().getTransactionId());
            dto.setAccountNumber(a.getTransaction().getAccountNumber());
            dto.setUserName(a.getTransaction().getUserName());
            dto.setAmount(a.getTransaction().getAmount());
            dto.setMerchantName(a.getTransaction().getMerchantName());
            dto.setLocation(a.getTransaction().getLocation());
            dto.setTransactionTimestamp(a.getTransaction().getTimestamp());
        }
        return dto;
    }
}
