package com.angkorlance.backend.dto;

public class FreelancerJobResponseDto {

    private final Long id;
    private final String title;
    private final String category;
    private final Double budget;
    private final String clientName;
    private final String imagePath;

    public FreelancerJobResponseDto(
            Long id,
            String title,
            String category,
            Double budget,
            String clientName,
            String imagePath
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.budget = budget;
        this.clientName = clientName;
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public Double getBudget() {
        return budget;
    }

    public String getClientName() {
        return clientName;
    }

    public String getImagePath() {
        return imagePath;
    }
}
