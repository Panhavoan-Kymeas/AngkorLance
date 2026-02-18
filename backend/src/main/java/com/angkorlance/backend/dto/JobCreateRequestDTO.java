package com.angkorlance.backend.dto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class JobCreateRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Budget is required")
    @Positive(message = "Budget must be positive")
    private Double budget;

    // Optional job image
    private MultipartFile jobImage;

    // No-args constructor
    public JobCreateRequestDTO() {}

    // All-args constructor
    public JobCreateRequestDTO(String title, String description, String category, Double budget, MultipartFile jobImage) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.budget = budget;
        this.jobImage = jobImage;
    }

    // Getters and Setters
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

    public MultipartFile getJobImage() {
        return jobImage;
    }

    public void setJobImage(MultipartFile jobImage) {
        this.jobImage = jobImage;
    }
}
