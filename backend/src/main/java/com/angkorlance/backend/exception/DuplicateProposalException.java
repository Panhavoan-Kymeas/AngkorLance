package com.angkorlance.backend.exception;

public class DuplicateProposalException extends RuntimeException {
    public DuplicateProposalException(String message) {
        super(message);
    }
}
