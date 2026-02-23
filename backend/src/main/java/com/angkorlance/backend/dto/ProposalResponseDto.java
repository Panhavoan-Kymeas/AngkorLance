package com.angkorlance.backend.dto;

import java.time.LocalDateTime;

import com.angkorlance.backend.entity.Proposal;

public class ProposalResponseDto {

    private Long proposalId;
    private Long freelancerId;
    private String freelancerName;
    private String freelancerEmail;

    private String message;
    private Double proposedPrice;
    private LocalDateTime createdAt;

    public static ProposalResponseDto fromEntity(Proposal proposal) {
        ProposalResponseDto dto = new ProposalResponseDto();

        dto.proposalId = proposal.getId();

        dto.freelancerId = proposal.getFreelancer().getId();
        dto.freelancerName = proposal.getFreelancer().getName();
        dto.freelancerEmail = proposal.getFreelancer().getEmail();

        dto.message = proposal.getMessage();
        dto.proposedPrice = proposal.getProposedPrice();
        dto.createdAt = proposal.getCreatedAt();

        return dto;
    }

    // getters
    public Long getProposalId() { return proposalId; }
    public Long getFreelancerId() { return freelancerId; }
    public String getFreelancerName() { return freelancerName; }
    public String getFreelancerEmail() { return freelancerEmail; }
    public String getMessage() { return message; }
    public Double getProposedPrice() { return proposedPrice; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}