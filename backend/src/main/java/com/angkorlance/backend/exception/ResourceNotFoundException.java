package com.angkorlance.backend.exception;

/**
 * Thrown when a requested entity does not exist. Mapped to HTTP 404 by
 * {@link com.angkorlance.backend.advices.GlobalExceptionHandler}.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException of(String entity, Object id) {
        return new ResourceNotFoundException(entity + " " + id + " not found");
    }
}
