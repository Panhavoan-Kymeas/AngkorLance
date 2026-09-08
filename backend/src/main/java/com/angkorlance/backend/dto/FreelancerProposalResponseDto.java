package com.angkorlance.backend.dto;

public class FreelancerProposalResponseDto {

    private final Long proposalId;
    private final Long jobId;
    private final String jobTitle;
    private final String jobStatus;
    private final Double proposedPrice;
    private final String status;

    public FreelancerProposalResponseDto(
            Long proposalId,
            Long jobId,
            String jobTitle,
            String jobStatus,
            Double proposedPrice,
            String status) {

        this.proposalId = proposalId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.jobStatus = jobStatus;
        this.proposedPrice = proposedPrice;
        this.status = status;
    }

    public Long getProposalId() {
        return proposalId;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public Double getProposedPrice() {
        return proposedPrice;
    }

    public String getStatus() {
        return status;
    }
}