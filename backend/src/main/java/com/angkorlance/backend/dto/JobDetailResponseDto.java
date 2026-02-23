package com.angkorlance.backend.dto;

import java.time.LocalDateTime;

public class JobDetailResponseDto {

    private final Long id;
    private final String title;
    private final String description;
    private final String category;
    private final Double budget;
    private final String status;
    private final LocalDateTime createdAt;
    private final Long clientId;
    private final String clientName;
    private final String jobImagePath;
    private final Integer proposalCount;

    public JobDetailResponseDto(
            Long id,
            String title,
            String description,
            String category,
            Double budget,
            String status,
            LocalDateTime createdAt,
            Long clientId,
            String clientName,
            String jobImagePath,
            Integer proposalCount
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.budget = budget;
        this.status = status;
        this.createdAt = createdAt;
        this.clientId = clientId;
        this.clientName = clientName;
        this.jobImagePath = jobImagePath;
        this.proposalCount = proposalCount;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public Double getBudget() { return budget; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Long getClientId() { return clientId; }
    public String getClientName() { return clientName; }
    public String getJobImagePath() { return jobImagePath; }
    public Integer getProposalCount() { return proposalCount; }
}