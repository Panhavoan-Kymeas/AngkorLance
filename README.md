# AngkorLance Backend

Backend REST API for **AngkorLance** platform built with **Spring Boot**.

---

## Features

- User registration and authentication (JWT)  
- Role-based access control (`CLIENT`, `FREELANCER`)  
- Job management (create, update, delete, complete)  
- Proposal management for freelancers  
- File uploads (images)  
- PostgreSQL database with Flyway migrations  

---

## API Endpoints

### Authentication
- `POST /api/auth/register` – Register user  
- `POST /api/auth/login` – Login user  

### Jobs
- `GET /api/jobs/{id}` – Job details  
- `GET /api/jobs/open` – List open jobs  
- `POST /api/jobs` – Create job (CLIENT only)  
- `PATCH /api/jobs/{id}` – Update job  
- `DELETE /api/jobs/{id}` – Delete job  
- `POST /api/jobs/{id}/complete` – Mark job complete (CLIENT only)  

### Proposals
- `POST /api/proposals` – Submit proposal (FREELANCER only)  
- `GET /api/jobs/{id}/proposals` – View proposals for job (CLIENT only)  
- `POST /api/proposals/{id}/accept` – Accept proposal (CLIENT only)  
- `GET /api/my-proposals` – Freelancer proposals  

### Database
- `GET /api/db-status` – Check database connection  

---

## Running with Docker

Start backend and database using Docker Compose:

```bash
docker-compose up --build
```

- Backend runs on `http://localhost:8080`  
- PostgreSQL accessible at `localhost:5432`  

---

## Folder Structure

```text
backend/
├─ src/main/java/com/angkorlance/backend
│  ├─ controller/        # REST endpoints
│  ├─ dto/               # Request/response objects
│  ├─ entity/            # JPA entities
│  ├─ repository/        # Spring Data repositories
│  ├─ service/           # Business logic
│  ├─ security/          # JWT and security utils
│  └─ validation/        # Custom validators
├─ src/main/resources
│  ├─ db/migration/      # Flyway migrations
│  ├─ application.yaml   # Spring config
│  └─ static/            # Static files
├─ uploads/              # Uploaded files
└─ Dockerfile.dev        # Dockerfile for dev environment
```

---

## License

MIT License