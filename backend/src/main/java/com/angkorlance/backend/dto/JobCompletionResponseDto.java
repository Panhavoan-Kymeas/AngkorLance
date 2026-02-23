package com.angkorlance.backend.dto;

public class JobCompletionResponseDto {

    private Long jobId;
    private String status;

    public JobCompletionResponseDto(Long jobId, String status) {
        this.jobId = jobId;
        this.status = status;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
