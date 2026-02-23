package com.angkorlance.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angkorlance.backend.entity.Proposal;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    Optional<Proposal> findByJobIdAndFreelancerId(Long jobId, Long freelancerId);

    List<Proposal> findByJobId(Long jobId);
}