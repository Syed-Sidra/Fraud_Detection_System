package com.example.transaction.cli;

import com.example.transaction.entity.Transaction;
import com.example.transaction.service.TransactionGeneratorService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class TransactionCLI implements CommandLineRunner {

    private final TransactionGeneratorService service;

    public TransactionCLI(TransactionGeneratorService service) {
        this.service = service;
    }

    @Override
    public void run(String... args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("1. Manual Transaction");
        System.out.println("2. Random Transaction");
        System.out.println("3. Generate Bulk (10,000)");
        System.out.println("4. Exit");
        int choice = scanner.nextInt();
        scanner.nextLine();

        if (choice == 1) {

            Transaction txn = new Transaction();



            System.out.print("Transaction Type (CREDIT/DEBIT): ");
            txn.setTransactionType(scanner.nextLine());

            System.out.print("Amount: ");
            txn.setAmount(scanner.nextDouble());
            scanner.nextLine();

            System.out.print("Location: ");
            txn.setLocation(scanner.nextLine());

            System.out.print("Device ID: ");
            txn.setDeviceId(scanner.nextLine());



            service.saveManualTransaction(txn);
            System.out.println("Transaction Saved!");

        } else if (choice == 2) {

            service.generateRandomTransaction();
            System.out.println("Random Transaction Generated!");

        } else if (choice == 3) {

            System.out.print("Enter number of transactions: ");
            int count = scanner.nextInt();

            service.generateBulkTransactions(count);

            System.out.println(count + " Transactions Generated Successfully!");
        }
    }
}