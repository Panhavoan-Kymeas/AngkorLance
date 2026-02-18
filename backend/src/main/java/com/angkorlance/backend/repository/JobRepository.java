package com.angkorlance.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.angkorlance.backend.entity.Job;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Optional: find all jobs by a specific client
    List<Job> findByClientId(Long clientId);

    // Optional: find all jobs with a specific status
    List<Job> findByStatus(String status);

    // Optional: find jobs by category
    List<Job> findByCategory(String category);
}
