package com.frauddetection.service;

import com.frauddetection.entity.FraudAlert;
import com.frauddetection.entity.Transaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendFraudAlertEmail(FraudAlert alert) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(fromEmail); // In production, send to admin/analyst emails
            helper.setSubject("🚨 FRAUD ALERT [" + alert.getSeverity() + "] - Transaction " +
                alert.getTransaction().getTransactionId());

            Transaction txn = alert.getTransaction();
            String html = buildEmailHtml(alert, txn);
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Fraud alert email sent for transaction: {}", txn.getTransactionId());
        } catch (Exception e) {
            log.error("Failed to send fraud alert email: {}", e.getMessage());
        }
    }

    private String buildEmailHtml(FraudAlert alert, Transaction txn) {
        String severityColor = switch (alert.getSeverity()) {
            case CRITICAL -> "#dc2626";
            case HIGH -> "#ea580c";
            case MEDIUM -> "#d97706";
            case LOW -> "#16a34a";
        };

        return """
            <!DOCTYPE html>
            <html>
            <head><style>
              body { font-family: Arial, sans-serif; background: #f3f4f6; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              .header { background: %s; color: white; padding: 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .body { padding: 24px; }
              .badge { display: inline-block; background: %s; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; }
              .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
              .label { color: #6b7280; font-size: 14px; }
              .value { font-weight: 600; font-size: 14px; }
              .reason-box { background: #fef2f2; border-left: 4px solid %s; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
              .footer { background: #f9fafb; padding: 16px; text-align: center; color: #6b7280; font-size: 12px; }
            </style></head>
            <body>
            <div class="container">
              <div class="header">
                <h1>🚨 Fraud Alert Detected</h1>
                <p style="margin:8px 0 0">Severity: <span class="badge">%s</span></p>
              </div>
              <div class="body">
                <h3 style="color:#111827;margin-top:0">Transaction Details</h3>
                <div class="info-row"><span class="label">Transaction ID</span><span class="value">%s</span></div>
                <div class="info-row"><span class="label">Account</span><span class="value">%s</span></div>
                <div class="info-row"><span class="label">Amount</span><span class="value" style="color:#dc2626;font-size:18px">₹%s</span></div>
                <div class="info-row"><span class="label">Merchant</span><span class="value">%s</span></div>
                <div class="info-row"><span class="label">Location</span><span class="value">%s</span></div>
                <div class="info-row"><span class="label">Timestamp</span><span class="value">%s</span></div>
                <div class="info-row"><span class="label">Risk Score</span><span class="value" style="color:%s">%.1f / 100</span></div>
                <div class="info-row"><span class="label">Rule Triggered</span><span class="value">%s</span></div>
                <div class="reason-box">
                  <strong style="color:%s">⚠️ Detection Reason:</strong>
                  <p style="margin:8px 0 0;color:#374151">%s</p>
                </div>
                <p style="color:#6b7280;font-size:13px">Please log in to the Fraud Detection Dashboard to review and resolve this alert immediately.</p>
              </div>
              <div class="footer">
                <p>Digital Banking Fraud Detection System | Automated Alert</p>
                <p>© 2024 Fraud Detection Platform. Do not reply to this email.</p>
              </div>
            </div>
            </body></html>
            """.formatted(
                severityColor, severityColor, severityColor,
                alert.getSeverity(),
                txn.getTransactionId(),
                txn.getAccountNumber(),
                txn.getAmount(),
                txn.getMerchantName() != null ? txn.getMerchantName() : "N/A",
                txn.getLocation() != null ? txn.getLocation() : "N/A",
                txn.getTimestamp(),
                severityColor, alert.getRiskScore(),
                alert.getRuleTriggered(),
                severityColor,
                alert.getFraudReason()
            );
    }
}
