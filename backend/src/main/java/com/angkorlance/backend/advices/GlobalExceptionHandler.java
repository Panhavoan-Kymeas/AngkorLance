package com.angkorlance.backend.advices;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.angkorlance.backend.exception.ConflictException;
import com.angkorlance.backend.exception.DuplicateEmailException;
import com.angkorlance.backend.exception.InvalidCredentialsException;
import com.angkorlance.backend.exception.InvalidRoleException;
import com.angkorlance.backend.exception.ResourceNotFoundException;

/**
 * Central error handling. Every error response is an RFC 7807 {@link ProblemDetail}
 * ({@code application/problem+json}) with a {@code traceId} extension so a client
 * report can be correlated with a server log line. Field-level validation errors
 * are returned under an {@code errors} extension (map of field name -> message).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // --- 400 Bean Validation (@Valid request bodies) ---
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fe ->
                errors.putIfAbsent(fe.getField(), fe.getDefaultMessage()));

        ProblemDetail pd = base(HttpStatus.BAD_REQUEST, "Validation failed",
                "One or more fields are invalid.");
        pd.setProperty("errors", errors);
        return pd;
    }

    // --- 409 duplicate email on registration ---
    @ExceptionHandler(DuplicateEmailException.class)
    public ProblemDetail handleDuplicateEmail(DuplicateEmailException ex) {
        ProblemDetail pd = base(HttpStatus.CONFLICT, "Registration failed", ex.getMessage());
        pd.setProperty("errors", Map.of("email", ex.getMessage()));
        return pd;
    }

    // --- 400 invalid role on registration ---
    @ExceptionHandler(InvalidRoleException.class)
    public ProblemDetail handleInvalidRole(InvalidRoleException ex) {
        ProblemDetail pd = base(HttpStatus.BAD_REQUEST, "Registration failed", ex.getMessage());
        pd.setProperty("errors", Map.of("role", ex.getMessage()));
        return pd;
    }

    // --- 401 bad login credentials ---
    @ExceptionHandler(InvalidCredentialsException.class)
    public ProblemDetail handleInvalidCredentials(InvalidCredentialsException ex) {
        return base(HttpStatus.UNAUTHORIZED, "Login failed", ex.getMessage());
    }

    // --- 401 any other authentication failure ---
    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuthentication(AuthenticationException ex) {
        return base(HttpStatus.UNAUTHORIZED, "Authentication required",
                "You must be authenticated to access this resource.");
    }

    // --- 403 authenticated but not allowed ---
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        return base(HttpStatus.FORBIDDEN, "Access denied",
                "You do not have permission to perform this action.");
    }

    // --- 404 ---
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        return base(HttpStatus.NOT_FOUND, "Not found", ex.getMessage());
    }

    // --- 409 state conflict ---
    @ExceptionHandler(ConflictException.class)
    public ProblemDetail handleConflict(ConflictException ex) {
        return base(HttpStatus.CONFLICT, "Conflict", ex.getMessage());
    }

    // --- 413 upload too large ---
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ProblemDetail handleUploadTooLarge(MaxUploadSizeExceededException ex) {
        return base(HttpStatus.PAYLOAD_TOO_LARGE, "File too large",
                "The uploaded file exceeds the maximum allowed size.");
    }

    // --- 400 bad input (type mismatch, malformed body, illegal argument) ---
    @ExceptionHandler({ IllegalArgumentException.class })
    public ProblemDetail handleBadRequest(IllegalArgumentException ex) {
        return base(HttpStatus.BAD_REQUEST, "Bad request", ex.getMessage());
    }

    // --- 500 catch-all: never leak internals to the client ---
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleUnexpected(Exception ex) {
        String traceId = UUID.randomUUID().toString();
        log.error("Unhandled exception [traceId={}]", traceId, ex);
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred. Please try again later.");
        pd.setTitle("Internal server error");
        pd.setProperty("traceId", traceId);
        pd.setProperty("timestamp", Instant.now().toString());
        return pd;
    }

    private ProblemDetail base(HttpStatus status, String title, String detail) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle(title);
        pd.setProperty("traceId", UUID.randomUUID().toString());
        pd.setProperty("timestamp", Instant.now().toString());
        return pd;
    }
}
