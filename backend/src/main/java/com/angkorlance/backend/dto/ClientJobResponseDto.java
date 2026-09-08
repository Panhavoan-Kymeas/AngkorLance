package com.angkorlance.backend.dto;

public class ClientJobResponseDto {

    private final Long id;
    private final String title;
    private final String category;
    private final Double budget;
    private final String status;
    private final String imageUrl;
    private final Integer proposalCount;

    public ClientJobResponseDto(
            Long id,
            String title,
            String category,
            Double budget,
            String status,
            String imageUrl,
            Integer proposalCount
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.budget = budget;
        this.status = status;
        this.imageUrl = imageUrl;
        this.proposalCount = proposalCount;
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

    public String getStatus() {
        return status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Integer getProposalCount() {
        return proposalCount;
    }
}
