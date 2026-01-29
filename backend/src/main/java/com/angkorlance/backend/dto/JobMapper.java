package com.angkorlance.backend.dto;

import com.angkorlance.backend.entity.Job;

public class JobMapper {

    // Convert Job entity to JobResponse DTO
    public static JobResponse toResponse(Job job) {
        if (job == null) return null;

        return new JobResponse(
                job.getId(),
                job.getClient().getId(),
                job.getClient().getName(),
                job.getTitle(),
                job.getDescription(),
                job.getCategory(),
                job.getBudget(),
                job.getStatus(),
                job.getCreatedAt(),
                job.getUpdatedAt()
        );
    }
}
