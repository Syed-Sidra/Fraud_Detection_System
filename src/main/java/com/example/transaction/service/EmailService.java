package com.example.transaction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendFraudAlert(String transactionId, Double amount) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo("sn0255724@gmail.com");
            message.setSubject("🚨 Fraud Transaction Alert");

            message.setText(
                    "Fraudulent transaction detected!\n\n" +
                            "Transaction ID: " + transactionId + "\n" +
                            "Amount: ₹" + amount
            );

            mailSender.send(message);

            System.out.println("Fraud alert email sent successfully.");

        } catch (Exception e) {

            System.out.println("Email sending failed but transaction processed.");
            System.out.println(e.getMessage());
        }
    }
}