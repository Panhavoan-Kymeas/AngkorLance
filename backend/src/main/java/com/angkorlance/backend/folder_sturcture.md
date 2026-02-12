# Folder Structure:
```text
backend/src/main/java/com/angkorlance/
├── entity/             # Your JPA entities (User, Role, Job, Proposal, Image, etc.)
├── repository/         # Spring Data JPA repositories (UserRepository, RoleRepository)
├── dto/                # Data Transfer Objects (RegisterRequest, LoginRequest, etc.)
├── service/            # Business logic (AuthService, UserService)
├── controller/         # REST endpoints (AuthController, UserController)
├── config/             # Security configuration (PasswordEncoder, JWT config, etc.)
├── exception/          # Custom exceptions (DuplicateEmailException, etc.)
└── advices/            # Global exception handlers (RestControllerAdvice)
└── security/           # JWT, filters, authentication utilities
└── validation/         # For custom validators
```