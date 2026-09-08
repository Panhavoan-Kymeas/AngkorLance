package com.angkorlance.backend.dto;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

/**
 * Partial update for a job. Every field is optional; a {@code null} field means
 * "leave unchanged". Non-null fields must still be valid.
 */
public class UpdateJobRequestDto {

    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    @Size(min = 1, message = "Description must not be blank")
    private String description;

    @Size(min = 1, max = 100, message = "Category must be between 1 and 100 characters")
    private String category;

    @Positive(message = "Budget must be positive")
    private Double budget;

    // getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }
}
