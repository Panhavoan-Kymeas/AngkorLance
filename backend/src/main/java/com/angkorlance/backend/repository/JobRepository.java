package com.angkorlance.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angkorlance.backend.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Optional: find all jobs by a specific client
    List<Job> findByClientId(Long clientId);

    // Optional: find all jobs with a specific status
    List<Job> findByStatus(String status);

    // Optional: find jobs by category
    List<Job> findByCategory(String category);

    Optional<Job> findByIdAndClientId(Long jobId, Long clientId);

    List<Job> findByStatusAndCategory(String status, String category);

    Page<Job> findByStatus(String status, Pageable pageable);

    Page<Job> findByStatusAndCategoryIgnoreCaseContaining(String status, String category, Pageable pageable);
}
