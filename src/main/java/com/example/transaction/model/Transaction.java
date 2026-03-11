package com.example.transaction.model;

public class Transaction {

    private int step;
    private int customer;
    private int age;
    private int gender;
    private int zipcodeOri;
    private int merchant;
    private int zipMerchant;
    private int category;
    private double amount;

    public Transaction() {}

    public Transaction(int step, int customer, int age, int gender,
                       int zipcodeOri, int merchant, int zipMerchant,
                       int category, double amount) {

        this.step = step;
        this.customer = customer;
        this.age = age;
        this.gender = gender;
        this.zipcodeOri = zipcodeOri;
        this.merchant = merchant;
        this.zipMerchant = zipMerchant;
        this.category = category;
        this.amount = amount;
    }

    public int getStep() { return step; }
    public void setStep(int step) { this.step = step; }

    public int getCustomer() { return customer; }
    public void setCustomer(int customer) { this.customer = customer; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public int getGender() { return gender; }
    public void setGender(int gender) { this.gender = gender; }

    public int getZipcodeOri() { return zipcodeOri; }
    public void setZipcodeOri(int zipcodeOri) { this.zipcodeOri = zipcodeOri; }

    public int getMerchant() { return merchant; }
    public void setMerchant(int merchant) { this.merchant = merchant; }

    public int getZipMerchant() { return zipMerchant; }
    public void setZipMerchant(int zipMerchant) { this.zipMerchant = zipMerchant; }

    public int getCategory() { return category; }
    public void setCategory(int category) { this.category = category; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}