package com.angkorlance.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angkorlance.backend.dto.ProposalAcceptanceResponseDto;
import com.angkorlance.backend.dto.ProposalRequestDto;
import com.angkorlance.backend.dto.ProposalResponseDto;
import com.angkorlance.backend.security.SecurityUtil;
import com.angkorlance.backend.service.ProposalService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ProposalController {

    private final ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    // ✅ Freelancer submits proposal
    @PostMapping("/proposals")
    @PreAuthorize("hasRole('FREELANCER')")
    public ResponseEntity<Long> submitProposal(
            @RequestBody @Valid ProposalRequestDto dto) {

        Long freelancerId = SecurityUtil.getCurrentUserId();
        Long proposalId = proposalService.submitProposal(dto, freelancerId);

        return ResponseEntity.ok(proposalId);
    }

    // ✅ Client views proposals for their job
    @GetMapping("/jobs/{jobId}/proposals")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<ProposalResponseDto>> getJobProposals(
            @PathVariable Long jobId) {

        Long clientId = SecurityUtil.getCurrentUserId();

        return ResponseEntity.ok(
                proposalService.getProposalsForClientJob(jobId, clientId));
    }

    @PostMapping("/proposals/{proposalId}/accept")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<ProposalAcceptanceResponseDto> acceptProposal(@PathVariable Long proposalId) {
        Long clientId = SecurityUtil.getCurrentUserId();
        ProposalAcceptanceResponseDto response = proposalService.acceptProposal(proposalId, clientId);
        return ResponseEntity.ok(response);
    }
}