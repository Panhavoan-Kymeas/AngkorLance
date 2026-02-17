package com.angkorlance.backend.security;

import java.io.IOException;
import java.util.List;

import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.service.AuthService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AuthService authService; // inject AuthService instead of repository

    public JwtAuthenticationFilter(JwtUtil jwtUtil, AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Skip if no Authorization header or does not start with Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        // Skip if token is invalid
        if (!jwtUtil.validateToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract user ID from token and load full user from DB
            String userId = jwtUtil.getUserIdFromToken(token);
            User user = authService.getUserById(userId);

            // Create Authentication object with full User and current roles
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user, // full User object as principal
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()))
                    );

            // Store in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e) {
            // If user not found or any exception occurs, clear context
            SecurityContextHolder.clearContext();
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
