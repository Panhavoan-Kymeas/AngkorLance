package com.angkorlance.backend.exception;

/**
 * Thrown when a request cannot be applied because it conflicts with the current
 * state of a resource (e.g. accepting a proposal on a job that is no longer OPEN,
 * or submitting a duplicate proposal). Mapped to HTTP 409 by
 * {@link com.angkorlance.backend.advices.GlobalExceptionHandler}.
 */
public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
