package com.example.transaction;

import com.example.transaction.entity.Transaction;
import com.example.transaction.service.TransactionGeneratorService;
import com.example.transaction.util.InputValidator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.Scanner;

@SpringBootApplication
public class TransactionApplication {

	public static void main(String[] args) {
		SpringApplication.run(TransactionApplication.class, args);
	}

	@Bean
	CommandLineRunner run(TransactionGeneratorService service) {
		return args -> {

			Scanner scanner = new Scanner(System.in);

			while (true) {

				System.out.println("\n==== Fraud Detection System ====");
				System.out.println("1. Manual Transaction");
				System.out.println("2. Random Transaction");
				System.out.println("3. Exit");
				System.out.print("Choose option: ");

				int choice = scanner.nextInt();
				scanner.nextLine();

				if (choice == 1) {

					Transaction txn = new Transaction();

					// Sender Name
					while (true) {
						System.out.print("Enter Sender Name (alphabets only): ");
						String senderName = scanner.nextLine();

						if (InputValidator.isValidName(senderName)) {
							txn.setSenderName(senderName);
							break;
						} else {
							System.out.println("Invalid name! Use alphabets only.");
						}
					}

					// Receiver Name
					while (true) {
						System.out.print("Enter Receiver Name (alphabets only): ");
						String receiverName = scanner.nextLine();

						if (InputValidator.isValidName(receiverName)) {
							txn.setReceiverName(receiverName);
							break;
						} else {
							System.out.println("Invalid name! Use alphabets only.");
						}
					}

					// Sender Account
					while (true) {
						System.out.print("Enter Sender Account (10-12 digits): ");
						String senderAcc = scanner.nextLine();

						if (InputValidator.isValidAccount(senderAcc)) {
							txn.setSenderAccount(senderAcc);
							break;
						} else {
							System.out.println("Invalid account number!");
						}
					}

					// Receiver Account
					while (true) {
						System.out.print("Enter Receiver Account (10-12 digits): ");
						String receiverAcc = scanner.nextLine();

						if (InputValidator.isValidAccount(receiverAcc)) {
							txn.setReceiverAccount(receiverAcc);
							break;
						} else {
							System.out.println("Invalid account number!");
						}
					}

					// Transaction Type
					while (true) {
						System.out.print("Enter Transaction Type (CREDIT/DEBIT): ");
						String type = scanner.nextLine();

						if (InputValidator.isValidTransactionType(type)) {
							txn.setTransactionType(type.toUpperCase());
							break;
						} else {
							System.out.println("Invalid type! Only CREDIT or DEBIT allowed.");
						}
					}

					// Amount
					while (true) {
						try {
							System.out.print("Enter Amount: ");
							double amount = Double.parseDouble(scanner.nextLine());

							if (InputValidator.isValidAmount(amount)) {
								txn.setAmount(amount);
								break;
							} else {
								System.out.println("Amount must be greater than 0.");
							}

						} catch (NumberFormatException e) {
							System.out.println("Invalid number format!");
						}
					}

					// Location
					while (true) {
						System.out.print("Enter Location: ");
						String location = scanner.nextLine();

						if (InputValidator.isValidLocation(location)) {
							txn.setLocation(location);
							break;
						} else {
							System.out.println("Location cannot be empty.");
						}
					}

					Transaction saved = service.saveManualTransaction(txn);

					System.out.println("✅ Transaction Saved!");
					System.out.println("Status: " + saved.getStatus());
					System.out.println("Risk Score: " + saved.getRiskScore());
				}
				else if (choice == 2) {

					Transaction saved = service.generateRandomTransaction();

					System.out.println("Random Transaction Generated!");
					System.out.println("Status: " + saved.getStatus());
					System.out.println("Risk Score: " + saved.getRiskScore());
				}

				else if (choice == 3) {
					System.out.println("Exiting...");
					break;
				}
			}

			scanner.close();
		};
	}
}