package com.angkorlance.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angkorlance.backend.service.DatabaseService;

@RestController
public class DatabaseController {
    
    private final DatabaseService databaseService;

    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/api/db-status")
    public String dbStatus() {
        return databaseService.checkConnection();
    }
}
