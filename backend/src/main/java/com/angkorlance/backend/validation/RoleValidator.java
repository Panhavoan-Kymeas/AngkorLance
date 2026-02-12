package com.angkorlance.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Set;

public class RoleValidator implements ConstraintValidator<ValidRole, String> {

    private final Set<String> allowedRoles = Set.of("CLIENT", "FREELANCER");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return false;
        return allowedRoles.contains(value.toUpperCase());
    }
}
