package com.angkorlance.backend.dto;

import java.time.LocalDateTime;

public class JobResponse {

    private Long id;
    private Long clientId;
    private String clientName;
    private String title;
    private String description;
    private String category;
    private Double budget;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor
    public JobResponse(Long id, Long clientId, String clientName, String title, String description,
                       String category, Double budget, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.clientName = clientName;
        this.title = title;
        this.description = description;
        this.category = category;
        this.budget = budget;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public Long getId() { return id; }
    public Long getClientId() { return clientId; }
    public String getClientName() { return clientName; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public Double getBudget() { return budget; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
