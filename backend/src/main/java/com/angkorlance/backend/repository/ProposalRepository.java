package com.angkorlance.backend.repository;

import com.angkorlance.backend.entity.Proposal;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    // Optional: find all proposals for a job
    List<Proposal> findByJob(Job job);

    // Optional: find all proposals by a freelancer
    List<Proposal> findByFreelancer(User freelancer);

    // Optional: find proposal by job and freelancer (for unique constraint check)
    Optional<Proposal> findByJobAndFreelancer(Job job, User freelancer);
}
