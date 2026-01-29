package com.angkorlance.backend.advices;

import com.angkorlance.backend.dto.ApiResponse;
import com.angkorlance.backend.exception.DuplicateEmailException;
import com.angkorlance.backend.exception.InvalidCredentialsException;
import com.angkorlance.backend.exception.InvalidRoleException;
import com.angkorlance.backend.exception.UnauthorizedException;
import com.angkorlance.backend.exception.AccessDeniedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation errors from @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(MethodArgumentNotValidException ex) {

        // LinkedHashMap preserves insertion order
        Map<String, String> errors = new LinkedHashMap<>();

        // Add fields in desired order
        String[] fieldOrder = {"name", "email", "password", "role"};

        // First, put Bean Validation errors
        for (String field : fieldOrder) {
            ex.getBindingResult().getFieldErrors().stream()
                    .filter(f -> f.getField().equals(field))
                    .findFirst()
                    .ifPresent(f -> errors.put(field, f.getDefaultMessage()));
        }

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(false, "Validation failed", errors));
    }

    // Handle duplicate email during registration
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleDuplicateEmail(DuplicateEmailException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        errors.put("email", ex.getMessage()); // always in order
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(false, "Registration failed", errors));
    }

    // Handle invalid role during registration
    @ExceptionHandler(InvalidRoleException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleInvalidRole(InvalidRoleException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        errors.put("role", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(false, "Registration failed", errors));
    }

    // Handle invalid login credentials
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleInvalidCredentials(InvalidCredentialsException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        errors.put("login", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(false, "Login failed", errors));
    }

    // Handle access denied for role-based restrictions
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleAccessDenied(AccessDeniedException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage()); // generic field for frontend

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN) // 403
                .body(new ApiResponse<>(false, "Access denied", errors));
    }

    // Handle UnauthorizedException thrown when token is missing, invalid, or expired
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnauthorized(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(false, ex.getMessage(), null));
    }


    // Handle any other unexpected exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleAllOtherExceptions(Exception ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        errors.put("error", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(false, "Something went wrong", errors));
    }
}
