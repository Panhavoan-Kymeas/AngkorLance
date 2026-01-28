package com.angkorlance.backend.service;

import com.angkorlance.backend.dto.ProposalRequest;
import com.angkorlance.backend.dto.ProposalResponse;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.Proposal;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.AccessDeniedException;
import com.angkorlance.backend.exception.DuplicateProposalException;
import com.angkorlance.backend.repository.JobRepository;
import com.angkorlance.backend.repository.ProposalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final JobRepository jobRepository;

    public ProposalService(ProposalRepository proposalRepository, JobRepository jobRepository) {
        this.proposalRepository = proposalRepository;
        this.jobRepository = jobRepository;
    }

    // Create a proposal
    public ProposalResponse createProposal(ProposalRequest request, User freelancer) {

        // Only freelancers can submit proposals
        if (!"FREELANCER".equals(freelancer.getRole().getName())) {
            throw new AccessDeniedException("Clients cannot submit proposals");
        }

        // Find the job
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        // Check if the freelancer already submitted a proposal
        if (proposalRepository.findByJobAndFreelancer(job, freelancer).isPresent()) {
            throw new DuplicateProposalException("You have already submitted a proposal for this job");
        }

        // Create and save proposal
        Proposal proposal = new Proposal();
        proposal.setJob(job);
        proposal.setFreelancer(freelancer);
        proposal.setMessage(request.getMessage());
        proposal.setProposedPrice(request.getProposedPrice());
        proposal.setStatus("PENDING");
        proposal.setCreatedAt(LocalDateTime.now());
        proposal.setUpdatedAt(LocalDateTime.now());

        Proposal savedProposal = proposalRepository.save(proposal);

        return new ProposalResponse(
                savedProposal.getId(),
                savedProposal.getJob().getId(),
                savedProposal.getFreelancer().getId(),
                savedProposal.getFreelancer().getName(),
                savedProposal.getMessage(),
                savedProposal.getProposedPrice(),
                savedProposal.getStatus(),
                savedProposal.getCreatedAt(),
                savedProposal.getUpdatedAt()
        );
    }
}
