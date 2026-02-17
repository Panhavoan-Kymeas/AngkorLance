package com.angkorlance.backend.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.angkorlance.backend.dto.LoginRequest;
import com.angkorlance.backend.dto.LoginResponse;
import com.angkorlance.backend.dto.RegisterRequest;
import com.angkorlance.backend.entity.Role;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.exception.DuplicateEmailException;
import com.angkorlance.backend.exception.InvalidCredentialsException;
import com.angkorlance.backend.exception.InvalidRoleException;
import com.angkorlance.backend.repository.RoleRepository;
import com.angkorlance.backend.repository.UserRepository;
import com.angkorlance.backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Get user details by ID (used in JWT filter)
    public User getUserById(String id) {
        try {
            long userId = Long.parseLong(id);
            return userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid user ID in token");
        }
    }

    // Registers a new user with a role.
    public void register(RegisterRequest request) {

        // 1. Check if email already exists
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new DuplicateEmailException("Email already exists");
        }

        // 2. Validate role
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new InvalidRoleException("Invalid role"));

        // 3. Create new User entity
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        // 4. Save user to DB
        userRepository.save(user);
    }

    // Login
     public LoginResponse login(LoginRequest request) {

        String email = request.getEmail().toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user);
        long expiresAt = jwtUtil.getExpirationDateFromToken(token).getTime();

        return new LoginResponse(
                token,
                expiresAt,
                user.getId(),
                user.getName(),
                user.getRole().getName()
        );
    }
}
