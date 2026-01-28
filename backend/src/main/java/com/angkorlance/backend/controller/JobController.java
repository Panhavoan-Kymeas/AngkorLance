package com.angkorlance.backend.controller;

import com.angkorlance.backend.dto.ApiResponse;
import com.angkorlance.backend.dto.JobRequest;
import com.angkorlance.backend.dto.JobResponse;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.service.JobService;
import com.angkorlance.backend.service.UserService;
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

    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> createJob(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody JobRequest request) {

        User user = userService.getUserFromToken(authHeader);
        JobResponse job = jobService.createJob(request, user);

        return ResponseEntity.ok(new ApiResponse<>(true, "Job created successfully", job));
    }
}
