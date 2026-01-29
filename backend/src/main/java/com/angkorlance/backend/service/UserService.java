package com.angkorlance.backend.service;

import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.ResourceNotFoundException;
import com.angkorlance.backend.exception.UnauthorizedException;
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
        if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
    }

    // Extract user from Bearer token
    public User getUserFromToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
            throw new UnauthorizedException("Invalid or expired token");
        }

        Long userId;
        try {
            userId = Long.parseLong(jwtUtil.getEmailFromToken(token));
        } catch (NumberFormatException ex) {
            throw new UnauthorizedException("Invalid token payload");
        }

        return userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

}
