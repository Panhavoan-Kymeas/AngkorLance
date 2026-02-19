package com.angkorlance.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angkorlance.backend.dto.ClientJobResponseDto;
import com.angkorlance.backend.dto.JobCreateRequestDTO;
import com.angkorlance.backend.dto.UpdateJobRequestDto;
import com.angkorlance.backend.security.SecurityUtil;
import com.angkorlance.backend.service.JobService;

import jakarta.validation.Valid;

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
    @PreAuthorize("hasRole('CLIENT')") // Enforces role-based access
    public ResponseEntity<Long> createJob(@ModelAttribute @Valid JobCreateRequestDTO jobRequest) {

        // Extract authenticated user ID from JWT
        Long clientId = SecurityUtil.getCurrentUserId();

        // Call service to create job
        Long jobId = jobService.createJob(jobRequest, clientId);

        // Return created job ID
        return ResponseEntity.ok(jobId);
    }

    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<ClientJobResponseDto>> getMyJobs() {

        Long clientId = SecurityUtil.getCurrentUserId();

        return ResponseEntity.ok(jobService.getClientJobs(clientId));
    }

    @PatchMapping("/{jobId}")
    public ResponseEntity<ClientJobResponseDto> updateJob(
            @PathVariable Long jobId,
            @RequestBody UpdateJobRequestDto dto) {

        Long userId = SecurityUtil.getCurrentUserId();
        ClientJobResponseDto updatedJob = jobService.updateJob(jobId, dto, userId);

        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        Long userId = SecurityUtil.getCurrentUserId();
        jobService.deleteJob(jobId, userId);
        return ResponseEntity.noContent().build();
    }

}
