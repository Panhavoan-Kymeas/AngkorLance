package com.angkorlance.backend.service;

import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DatabaseService {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String checkConnection() {
        try (Connection conn = jdbcTemplate.getDataSource().getConnection()) {
            return (conn != null && !conn.isClosed()) 
                    ? "Database connected succefully!"
                    : "Database connection failed!";
        } catch (SQLException e) {
            return "Database connection error: " + e.getMessage();
        }
    }

}
