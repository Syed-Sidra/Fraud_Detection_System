package com.frauddetection.service;

import com.frauddetection.entity.FraudAlert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String senderEmail;

    @Value("${app.alert.email:}")
    private String alertEmail;

    // ── Main alert email (original signature — takes FraudAlert) ─────────
    @Async
    public void sendFraudAlertEmail(FraudAlert alert) {
        if (alertEmail == null || alertEmail.isBlank()) return;
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setFrom(senderEmail);
            helper.setTo(alertEmail);
            helper.setSubject("🚨 FraudGuard Alert — "
                    + alert.getSeverity() + " | "
                    + (alert.getTransaction() != null
                    ? alert.getTransaction().getTransactionId()
                    : "Unknown"));
            helper.setText(buildHtml(alert), true);
            mailSender.send(msg);
            log.info("Fraud alert email sent for alert id={}", alert.getId());
        } catch (Exception e) {
            log.error("Email send failed: {}", e.getMessage());
        }
    }

    // ── Test email ────────────────────────────────────────────────────────
    @Async
    public void sendTestEmail() {
        if (alertEmail == null || alertEmail.isBlank()) return;
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
            helper.setFrom(senderEmail);
            helper.setTo(alertEmail);
            helper.setSubject("✅ FraudGuard — SMTP Test Successful");
            helper.setText(
                    "<h2 style='color:#22c55e'>SMTP is configured correctly!</h2>" +
                            "<p>FraudGuard Voting Ensemble ML system is active.</p>", true);
            mailSender.send(msg);
        } catch (Exception e) {
            log.error("Test email failed: {}", e.getMessage());
        }
    }

    // ── HTML email builder ────────────────────────────────────────────────
    private String buildHtml(FraudAlert alert) {
        String severityColor = switch (alert.getSeverity()) {
            case CRITICAL -> "#dc2626";
            case HIGH     -> "#ea580c";
            case MEDIUM   -> "#d97706";
            default       -> "#16a34a";
        };

        // Extract transaction details safely
        String txnId      = alert.getTransaction() != null ? alert.getTransaction().getTransactionId() : "N/A";
        String account    = alert.getTransaction() != null ? alert.getTransaction().getAccountNumber() : "N/A";
        String merchant   = alert.getTransaction() != null && alert.getTransaction().getMerchantName() != null
                ? alert.getTransaction().getMerchantName() : "N/A";
        String location   = alert.getTransaction() != null && alert.getTransaction().getLocation() != null
                ? alert.getTransaction().getLocation() : "N/A";
        String timestamp  = alert.getTransaction() != null && alert.getTransaction().getTimestamp() != null
                ? alert.getTransaction().getTimestamp().toString() : "N/A";

        // amount is BigDecimal — format safely
        String amountStr = "N/A";
        if (alert.getTransaction() != null && alert.getTransaction().getAmount() != null) {
            BigDecimal amt = alert.getTransaction().getAmount();
            amountStr = String.format("₹%,.2f", amt.doubleValue());
        }

        // ML ensemble breakdown (if available)
        String mlRow = "";
        if (alert.getMlFraudProbability() != null && alert.getMlFraudProbability() > 0) {
            mlRow = String.format(
                    "<tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>ML Ensemble</td>" +
                            "<td style='padding:8px'>P(fraud)=%.1f%%&nbsp;&nbsp;" +
                            "RF=%.1f%%&nbsp;|&nbsp;GB=%.1f%%&nbsp;|&nbsp;LR=%.1f%%</td></tr>",
                    alert.getMlFraudProbability() * 100,
                    alert.getMlRfProbability() != null ? alert.getMlRfProbability() * 100 : 0,
                    alert.getMlGbProbability() != null ? alert.getMlGbProbability() * 100 : 0,
                    alert.getMlLrProbability() != null ? alert.getMlLrProbability() * 100 : 0
            );
        }

        return """
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;
                        border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
              <div style="background:%s;padding:24px;text-align:center">
                <h1 style="color:white;margin:0;font-size:22px">
                  🚨 FRAUD ALERT — %s
                </h1>
              </div>
              <div style="padding:24px;text-align:center;background:#fafafa;
                          border-bottom:1px solid #e5e7eb">
                <div style="font-size:36px;font-weight:bold;color:%s">%s</div>
                <div style="color:#6b7280;margin-top:4px">Transaction Amount</div>
                <div style="margin-top:12px">
                  <span style="background:%s;color:white;padding:4px 16px;
                               border-radius:20px;font-size:13px;font-weight:600">
                    Risk Score: %.0f / 100
                  </span>
                </div>
              </div>
              <div style="padding:16px 24px;background:#fff7ed;
                          border-left:4px solid %s;margin:16px">
                <strong style="color:#92400e">Detection Reason:</strong>
                <p style="color:#78350f;margin:4px 0 0">%s</p>
              </div>
              <div style="padding:0 24px 24px">
                <table style="width:100%%;border-collapse:collapse;font-size:13px">
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Transaction ID</td>
                      <td style='padding:8px'>%s</td></tr>
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Account</td>
                      <td style='padding:8px'>%s</td></tr>
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Merchant</td>
                      <td style='padding:8px'>%s</td></tr>
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Location</td>
                      <td style='padding:8px'>%s</td></tr>
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Rule Triggered</td>
                      <td style='padding:8px'>%s</td></tr>
                  %s
                  <tr><td style='padding:8px;font-weight:bold;background:#f8fafc'>Timestamp</td>
                      <td style='padding:8px'>%s</td></tr>
                </table>
              </div>
              <div style="padding:16px 24px;background:#f1f5f9;text-align:center;
                          font-size:12px;color:#94a3b8">
                FraudGuard — Voting Ensemble (RF + GB + LR) · Hybrid Detection
              </div>
            </div>
            """.formatted(
                severityColor, alert.getSeverity(),
                severityColor, amountStr,
                severityColor, alert.getRiskScore() != null ? alert.getRiskScore() : 0.0,
                severityColor,
                alert.getFraudReason() != null ? alert.getFraudReason() : "N/A",
                txnId, account, merchant, location,
                alert.getRuleTriggered() != null ? alert.getRuleTriggered() : "N/A",
                mlRow,
                timestamp
        );
    }
}