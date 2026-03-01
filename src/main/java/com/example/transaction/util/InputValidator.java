package com.example.transaction.util;

public class InputValidator {

    public static boolean isValidName(String name) {
        return name != null && name.matches("^[A-Za-z ]+$");
    }

    public static boolean isValidAccount(String account) {
        return account != null && account.matches("^\\d{10,12}$");
    }

    public static boolean isValidTransactionType(String type) {
        return type != null &&
                (type.equalsIgnoreCase("CREDIT") ||
                        type.equalsIgnoreCase("DEBIT"));
    }

    public static boolean isValidAmount(double amount) {
        return amount > 0;
    }

    public static boolean isValidLocation(String location) {
        return location != null && !location.trim().isEmpty();
    }
}