package com.angkorlance.backend.controller;

import com.angkorlance.backend.dto.ApiResponse;
import com.angkorlance.backend.dto.JobRequest;
import com.angkorlance.backend.dto.JobResponse;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.service.JobService;
import com.angkorlance.backend.service.UserService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final UserService userService;

    public JobController(JobService jobService, UserService userService) {
        this.jobService = jobService;
        this.userService = userService;
    }

    // Create Job
    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody JobRequest request) {

        User user = userService.getUserFromToken(authHeader);
        JobResponse job = jobService.createJob(request, user);

        return ResponseEntity.ok(new ApiResponse<>(true, "Job created successfully", job));
    }

    // View Job
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getMyJobs(
            @RequestHeader("Authorization") String authHeader) {

        User user = userService.getUserFromToken(authHeader);

        List<JobResponse> jobs = jobService.getJobsByClient(user);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Jobs retrieved successfully", jobs));
    }

}
