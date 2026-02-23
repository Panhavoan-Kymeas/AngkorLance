package com.angkorlance.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProposalRequestDto {

    @NotNull
    private Long jobId;

    @NotBlank
    private String message;

    @NotNull
    @Min(0)
    private Double proposedPrice;

    // Getters and setters
    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Double getProposedPrice() { return proposedPrice; }
    public void setProposedPrice(Double proposedPrice) { this.proposedPrice = proposedPrice; }
}