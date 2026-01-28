package com.angkorlance.backend.controller;

import com.angkorlance.backend.dto.ApiResponse;
import com.angkorlance.backend.dto.ProposalRequest;
import com.angkorlance.backend.dto.ProposalResponse;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.service.ProposalService;
import com.angkorlance.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    private final ProposalService proposalService;
    private final UserService userService;

    public ProposalController(ProposalService proposalService, UserService userService) {
        this.proposalService = proposalService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProposalResponse>> submitProposal(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ProposalRequest request) {

        // Extract user from token
        User freelancer = userService.getUserFromToken(authHeader);

        // Delegate to service — service handles role check & duplicates
        ProposalResponse response = proposalService.createProposal(request, freelancer);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Proposal submitted successfully", response)
        );
    }
}
