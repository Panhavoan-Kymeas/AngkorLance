package com.angkorlance.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angkorlance.backend.dto.ApiResponse;
import com.angkorlance.backend.dto.LoginRequest;
import com.angkorlance.backend.dto.LoginResponse;
import com.angkorlance.backend.dto.RegisterRequest;
import com.angkorlance.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse loginData = authService.login(request);
        ApiResponse<LoginResponse> response = new ApiResponse<>(true, "Login successful", loginData);
        return ResponseEntity.ok(response);
    }
}
