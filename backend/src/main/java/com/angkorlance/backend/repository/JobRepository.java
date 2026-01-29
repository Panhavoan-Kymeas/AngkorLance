package com.angkorlance.backend.repository;

import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Find all jobs createb by a specific client
    List<Job> findByClient(User client);
}
