package com.angkorlance.backend.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.angkorlance.backend.dto.JobCreateRequestDTO;
import com.angkorlance.backend.service.JobService;
import com.angkorlance.backend.security.SecurityUtil;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    /**
     * Create a new job
     * Only users with role CLIENT can access
     */
    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")  // Enforces role-based access
    public ResponseEntity<Long> createJob(@ModelAttribute @Valid JobCreateRequestDTO jobRequest) {

        // Extract authenticated user ID from JWT
        Long clientId = SecurityUtil.getCurrentUserId();

        // Call service to create job
        Long jobId = jobService.createJob(jobRequest, clientId);

        // Return created job ID
        return ResponseEntity.ok(jobId);
    }
}
