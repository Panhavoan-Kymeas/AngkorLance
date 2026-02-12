package com.angkorlance.backend.dto;

public class LoginResponse {

    private String token;
    private long expiresAt;
    private Long userId;
    private String name;
    private String role;

    public LoginResponse(String token, long expiresAt, Long userId, String name, String role) {
        this.token = token;
        this.expiresAt = expiresAt;
        this.userId = userId;
        this.name = name;
        this.role = role;
    }

    // Getters
    public String getToken() { return token; }
    public long getExpiresAt() { return expiresAt; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getRole() { return role; }

    // Setters
    public void setToken(String token) { this.token = token; }
    public void setExpiresAt(long expiresAt) { this.expiresAt = expiresAt; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setName(String name) { this.name = name; }
    public void setRole(String role) { this.role = role; }
}
