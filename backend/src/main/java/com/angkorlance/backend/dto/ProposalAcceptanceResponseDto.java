package com.angkorlance.backend.dto;

public class ProposalAcceptanceResponseDto {

    private Long proposalId;
    private String status; // ACCEPTED
    private String jobStatus; // IN_PROGRESS

    public ProposalAcceptanceResponseDto(Long proposalId, String status, String jobStatus) {
        this.proposalId = proposalId;
        this.status = status;
        this.jobStatus = jobStatus;
    }

    public Long getProposalId() { return proposalId; }
    public void setProposalId(Long proposalId) { this.proposalId = proposalId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getJobStatus() { return jobStatus; }
    public void setJobStatus(String jobStatus) { this.jobStatus = jobStatus; }
}