package com.angkorlance.backend.service;

import com.angkorlance.backend.dto.JobRequest;
import com.angkorlance.backend.dto.JobResponse;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.AccessDeniedException;
import com.angkorlance.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create job 
    public JobResponse createJob(JobRequest request, User user) {
        if (!"CLIENT".equals(user.getRole().getName())) {
            throw new AccessDeniedException("Freelancer cannot create job posts");
        }

        Job job = new Job();
        job.setClient(user);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setBudget(request.getBudget());
        job.setStatus("OPEN");
        job.setCreatedAt(LocalDateTime.now());
        job.setUpdatedAt(LocalDateTime.now());

        Job savedJob = jobRepository.save(job);

        return new JobResponse(
                savedJob.getId(),
                savedJob.getClient().getId(),
                savedJob.getClient().getName(),
                savedJob.getTitle(),
                savedJob.getDescription(),
                savedJob.getCategory(),
                savedJob.getBudget(),
                savedJob.getStatus(),
                savedJob.getCreatedAt(),
                savedJob.getUpdatedAt()
        );
    }
}
