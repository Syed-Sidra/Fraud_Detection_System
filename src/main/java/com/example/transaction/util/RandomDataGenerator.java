package com.example.transaction.util;

import java.util.List;
import java.util.Random;

public class RandomDataGenerator {

    private static final Random random = new Random();

    private static final List<String> firstNames = List.of(
            "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun",
            "Fatima", "Ananya", "Sara", "Ishita", "Meera",
            "Kabir", "Rohan", "Zoya", "Aisha", "Rahul"
    );

    private static final List<String> lastNames = List.of(
            "Sharma", "Verma", "Khan", "Singh", "Gupta",
            "Patel", "Ansari", "Mehta", "Kapoor", "Malhotra"
    );

    private static final List<String> cities = List.of(
            "Mumbai", "Delhi", "Lucknow", "Bangalore",
            "Hyderabad", "Chennai", "Kolkata",
            "Pune", "Jaipur", "Ahmedabad"
    );

    public static String randomName() {
        return firstNames.get(random.nextInt(firstNames.size())) +
                " " +
                lastNames.get(random.nextInt(lastNames.size()));
    }

    public static String randomCity() {
        return cities.get(random.nextInt(cities.size()));
    }

    public static String randomAccountNumber() {
        return String.valueOf(1000000000L + (long)(random.nextDouble() * 9000000000L));
    }

    public static String randomDeviceId() {
        return "DEV-" + (1000 + random.nextInt(9000));
    }
}