package com.angkorlance.backend.service;

import com.angkorlance.backend.dto.JobMapper;
import com.angkorlance.backend.dto.JobRequest;
import com.angkorlance.backend.dto.JobResponse;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.AccessDeniedException;
import com.angkorlance.backend.exception.UnauthorizedException;
import com.angkorlance.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Create job
    public JobResponse createJob(JobRequest request, User user) {
        
        // Check if user exists
        if (user == null) {
            throw new UnauthorizedException("Invalid or missing token");
        }

                // Only clients can create jobs
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

        return JobMapper.toResponse(savedJob);
    }

    // Get all jobs created by the authenticated client
    public List<JobResponse> getJobsByClient(User user) {

        // Check if user exists
        if (user == null) {
            throw new UnauthorizedException("Invalid or missing token");
        }

        // Only clients can view their job posts
        if (!"CLIENT".equals(user.getRole().getName())) {
            throw new AccessDeniedException("Only clients can view their job posts");
        }

        // Fetch jobs belonging to this client
        List<Job> jobs = jobRepository.findByClient(user);

        // Convert each Job entity into JobResponse DTO
        return jobs.stream()
           .map(JobMapper::toResponse)
           .toList();
    }

}
