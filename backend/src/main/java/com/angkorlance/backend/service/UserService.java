package com.angkorlance.backend.service;

import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.InvalidCredentialsException;
import com.angkorlance.backend.exception.ResourceNotFoundException;
import com.angkorlance.backend.repository.UserRepository;
import com.angkorlance.backend.security.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public UserService(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // Get user by ID
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
    }

    // Extract user from Bearer token
    public User getUserFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidCredentialsException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // remove "Bearer "
        if (!jwtUtil.validateToken(token)) {
            throw new InvalidCredentialsException("Invalid or expired token");
        }

        Long userId = Long.parseLong(jwtUtil.getEmailFromToken(token)); // we used id as subject
        return userRepository.findById(userId)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));
    }
}
