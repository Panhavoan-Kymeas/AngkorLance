package com.angkorlance.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProposalRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    @NotBlank(message = "Message is required")
    private String message;

    @NotNull(message = "Proposed price is required")
    @Positive(message = "Proposed price must be greater than 0")
    private Double proposedPrice;

    // Getters and setters
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Double getProposedPrice() { return proposedPrice; }
    public void setProposedPrice(Double proposedPrice) { this.proposedPrice = proposedPrice; }
}
