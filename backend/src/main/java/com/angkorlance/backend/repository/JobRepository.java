package com.angkorlance.backend.repository;

import com.angkorlance.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // Additional queries if needed, e.g., findByClientId
}
