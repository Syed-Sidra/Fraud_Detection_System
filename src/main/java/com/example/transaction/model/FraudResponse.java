package com.example.transaction.model;

public class FraudResponse {

    private int prediction;
    private double fraud_probability;

    public int getPrediction() {
        return prediction;
    }

    public void setPrediction(int prediction) {
        this.prediction = prediction;
    }

    public double getFraud_probability() {
        return fraud_probability;
    }

    public void setFraud_probability(double fraud_probability) {
        this.fraud_probability = fraud_probability;
    }
}