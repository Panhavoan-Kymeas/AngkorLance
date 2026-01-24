# AnkorLance Backend Folder Structure

This document describes the scalable Spring Boot MVC folder structure
for the **AnkorLance** platform.

AnkorLance is a freelancer--client marketplace designed using a
feature-based modular MVC architecture to ensure scalability and
maintainability.

------------------------------------------------------------------------

## Root Structure

    src
    └── main
        ├── java
        │   └── com.ankorlance
        │       ├── config
        │       ├── common
        │       ├── auth
        │       ├── user
        │       ├── project
        │       ├── proposal
        │       ├── contract
        │       ├── payment
        │       ├── review
        │       └── AnkorLanceApplication.java
        └── resources   

------------------------------------------------------------------------

## Folder Explanations

### 1. config/

Stores application configuration classes. - SecurityConfig (Spring
Security rules) - JWT filter & JWT service - CORS configuration -
Password encoder beans

Purpose: Central place for system-wide configuration and security setup.

------------------------------------------------------------------------

### 2. common/

Stores shared components used across modules.

Subfolders: - exception/ → GlobalExceptionHandler, custom exceptions -
response/ → Standard API response wrapper - util/ → Utility classes -
constants/ → Global enums or constants

Purpose: Avoid duplication and keep reusable logic centralized.

------------------------------------------------------------------------

### 3. auth/

Handles authentication logic.

Contains: - AuthController → Login & register endpoints - AuthService →
Business logic for authentication - DTOs → LoginRequest,
RegisterRequest, AuthResponse

Purpose: Manages user authentication and token generation.

------------------------------------------------------------------------

### 4. user/

Handles user management.

Contains: - User entity - Role enum (CLIENT, FREELANCER) -
UserRepository - UserService - UserController - DTOs

Purpose: Manages profile data and role-based user operations.

------------------------------------------------------------------------

### 5. project/

Handles project management (Client side).

Contains: - Project entity - ProjectStatus enum - ProjectRepository -
ProjectService - ProjectController - DTOs

Purpose: Clients create, update, and manage projects.

------------------------------------------------------------------------

### 6. proposal/

Handles freelancer proposals.

Contains: - Proposal entity - ProposalStatus enum - ProposalRepository -
ProposalService - ProposalController - DTOs

Purpose: Freelancers submit proposals; clients accept or reject them.

------------------------------------------------------------------------

### 7. contract/

Handles agreements between freelancer and client.

Contains: - Contract entity - ContractStatus enum - ContractRepository -
ContractService - ContractController

Purpose: Manages active work agreements and workflow status.

------------------------------------------------------------------------

### 8. payment/

Handles payment records.

Contains: - Payment entity - PaymentStatus enum - PaymentRepository -
PaymentService - PaymentController

Purpose: Stores transaction records and payment states.

------------------------------------------------------------------------

### 9. review/

Handles ratings and feedback.

Contains: - Review entity - ReviewRepository - ReviewService -
ReviewController

Purpose: Allows both freelancer and client to rate each other after
contract completion.

------------------------------------------------------------------------

## resources/

Contains: - application.yml → Configuration properties -
application-dev.yml → Development settings - application-prod.yml →
Production settings - db migration scripts (if using Flyway/Liquibase)

Purpose: Environment configuration and database migration files.

------------------------------------------------------------------------

## Scalability Design Principles

-   Feature-based modular structure
-   Clear separation of Controller, Service, Repository
-   DTO separation from Entity
-   Enum-based workflow statuses
-   Easy to extract into microservices later

This structure allows AnkorLance to scale as new features like chat,
notification, analytics, or admin modules are added.
