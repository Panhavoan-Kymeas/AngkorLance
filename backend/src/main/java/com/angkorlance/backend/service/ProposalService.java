package com.angkorlance.backend.service;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angkorlance.backend.dto.FreelancerProposalResponseDto;
import com.angkorlance.backend.dto.ProposalAcceptanceResponseDto;
import com.angkorlance.backend.dto.ProposalRequestDto;
import com.angkorlance.backend.dto.ProposalResponseDto;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.Proposal;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.ConflictException;
import com.angkorlance.backend.exception.ResourceNotFoundException;
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
                .orElseThrow(() -> ResourceNotFoundException.of("Freelancer", freelancerId));

        Job job = jobRepository.findById(dto.getJobId())
                .orElseThrow(() -> ResourceNotFoundException.of("Job", dto.getJobId()));

        if (!"OPEN".equals(job.getStatus())) {
            throw new ConflictException("This job is no longer open for proposals");
        }

        // Check for existing proposal
        proposalRepository.findByJobIdAndFreelancerId(job.getId(), freelancer.getId())
                .ifPresent(p -> {
                    throw new ConflictException("You have already submitted a proposal for this job");
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
                .orElseThrow(() -> ResourceNotFoundException.of("Client", clientId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> ResourceNotFoundException.of("Job", jobId));

        // Ownership check
        if (!job.getClient().getId().equals(client.getId())) {
            throw new AccessDeniedException("You do not own this job");
        }

        return proposalRepository.findByJobId(jobId)
                .stream()
                .map(ProposalResponseDto::fromEntity)
                .toList();
    }

    @Transactional
    public ProposalAcceptanceResponseDto acceptProposal(Long proposalId, Long clientId) {

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> ResourceNotFoundException.of("Proposal", proposalId));

        Job job = proposal.getJob();

        // Verify ownership
        if (!job.getClient().getId().equals(clientId)) {
            throw new AccessDeniedException("You do not own this job");
        }

        // A proposal can only be accepted while the job is still open and the
        // proposal itself is still pending. This prevents re-accepting on an
        // IN_PROGRESS job (which would re-run the reject sweep) and prevents
        // "accepting" an already-rejected proposal.
        if (!"OPEN".equals(job.getStatus())) {
            throw new ConflictException("This job is no longer open; a proposal has already been accepted");
        }
        if (!"PENDING".equals(proposal.getStatus())) {
            throw new ConflictException("Only a pending proposal can be accepted");
        }

        // Accept the selected proposal
        proposal.setStatus("ACCEPTED");
        proposalRepository.save(proposal);

        // Reject all other proposals for this job
        List<Proposal> otherProposals = proposalRepository.findByJobIdAndIdNot(job.getId(), proposalId);
        for (Proposal p : otherProposals) {
            p.setStatus("REJECTED");
        }
        proposalRepository.saveAll(otherProposals);

        // Update job status
        job.setStatus("IN_PROGRESS");
        jobRepository.save(job);

        return new ProposalAcceptanceResponseDto(proposal.getId(), proposal.getStatus(), job.getStatus());
    }

    @Transactional
    public void rejectProposal(Long proposalId, Long clientId) {

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> ResourceNotFoundException.of("Proposal", proposalId));

        Job job = proposal.getJob();

        if (!job.getClient().getId().equals(clientId)) {
            throw new AccessDeniedException("You do not own this job");
        }
        if (!"OPEN".equals(job.getStatus())) {
            throw new ConflictException("Proposals can only be rejected while the job is open");
        }
        if (!"PENDING".equals(proposal.getStatus())) {
            throw new ConflictException("Only a pending proposal can be rejected");
        }

        proposal.setStatus("REJECTED");
        proposalRepository.save(proposal);
    }

    @Transactional(readOnly = true)
    public List<FreelancerProposalResponseDto> getFreelancerProposals(Long freelancerId) {

    List<Proposal> proposals = proposalRepository.findByFreelancerId(freelancerId);

    return proposals.stream()
            .map(proposal -> new FreelancerProposalResponseDto(
                    proposal.getId(),
                    proposal.getJob().getId(),
                    proposal.getJob().getTitle(),
                    proposal.getJob().getStatus(),
                    proposal.getProposedPrice(),
                    proposal.getStatus()
            ))
            .toList();
}
}