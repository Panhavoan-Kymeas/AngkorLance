package com.angkorlance.backend.repository;

import com.angkorlance.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Check if an email already exists
    boolean existsByEmail(String email);

    // Find a user by email (used for login later)
    Optional<User> findByEmail(String email);
}
