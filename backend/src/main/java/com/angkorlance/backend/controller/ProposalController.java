package com.angkorlance.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angkorlance.backend.dto.ProposalRequestDto;
import com.angkorlance.backend.security.SecurityUtil;
import com.angkorlance.backend.service.ProposalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    private final ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @PostMapping
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<Long> submitProposal(@RequestBody @Valid ProposalRequestDto dto) {

        Long freelancerId = SecurityUtil.getCurrentUserId();
        Long proposalId = proposalService.submitProposal(dto, freelancerId);

        return ResponseEntity.ok(proposalId);
    }
}