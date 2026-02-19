package com.angkorlance.backend.dto;

public class JobResponseDto {

    private Long id;
    private String title;
    private String description;
    private Double budget;
    private String status;

    // constructor
    public JobResponseDto(Long id,
                          String title,
                          String description,
                          Double budget,
                          String status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.budget = budget;
        this.status = status;
    }

    // getters
}

