package com.angkorlance.backend.dto;

public class FreelancerProposalResponseDto {

    private final Long proposalId;
    private final Long jobId;
    private final String jobTitle;
    private final String jobStatus;
    private final Double proposedBudget;
    private final String proposalStatus;

    public FreelancerProposalResponseDto(
            Long proposalId,
            Long jobId,
            String jobTitle,
            String jobStatus,
            Double proposedBudget,
            String proposalStatus) {

        this.proposalId = proposalId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.jobStatus = jobStatus;
        this.proposedBudget = proposedBudget;
        this.proposalStatus = proposalStatus;
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

    public Double getProposedBudget() {
        return proposedBudget;
    }

    public String getProposalStatus() {
        return proposalStatus;
    }
}