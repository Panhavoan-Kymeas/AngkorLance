package com.angkorlance.backend.repository;

import com.angkorlance.backend.entity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long>{
    
    // Find a role by name
    Optional<Role> findByName(String name);
}
