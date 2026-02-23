package com.angkorlance.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angkorlance.backend.dto.ProposalRequestDto;
import com.angkorlance.backend.dto.ProposalResponseDto;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.Proposal;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.repository.JobRepository;
import com.angkorlance.backend.repository.ProposalRepository;
import com.angkorlance.backend.repository.UserRepository;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ProposalService(ProposalRepository proposalRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {
        this.proposalRepository = proposalRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Long submitProposal(ProposalRequestDto dto, Long freelancerId) {

        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Job job = jobRepository.findById(dto.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!"OPEN".equals(job.getStatus())) {
            throw new RuntimeException("Cannot submit proposal to non-OPEN job");
        }

        // Check for existing proposal
        proposalRepository.findByJobIdAndFreelancerId(job.getId(), freelancer.getId())
                .ifPresent(p -> {
                    throw new RuntimeException("Proposal already submitted for this job");
                });

        Proposal proposal = new Proposal();
        proposal.setJob(job);
        proposal.setFreelancer(freelancer);
        proposal.setMessage(dto.getMessage());
        proposal.setProposedPrice(dto.getProposedPrice());
        proposal.setStatus("PENDING");

        Proposal saved = proposalRepository.save(proposal);
        return saved.getId();
    }

    @Transactional(readOnly = true)
    public List<ProposalResponseDto> getProposalsForClientJob(Long jobId, Long clientId) {

        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Ownership check
        if (!job.getClient().getId().equals(client.getId())) {
            throw new RuntimeException("You are not allowed to view proposals for this job");
        }

        return proposalRepository.findByJobId(jobId)
                .stream()
                .map(ProposalResponseDto::fromEntity)
                .toList();
    }
}