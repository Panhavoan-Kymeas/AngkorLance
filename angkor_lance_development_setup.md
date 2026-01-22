# AngkorLance

AngkorLance is a simplified freelance marketplace built as a full‑stack project using **Spring Boot**, **React (Vite)**, **PostgreSQL**, **Docker**, and **Nginx (production only)**.

This README currently documents **development setup only**.

---

## Tech Stack (Dev)

- **Backend**: Java 21, Spring Boot, Maven
- **Frontend**: React + Vite + Tailwind CSS
- **Database**: PostgreSQL 15
- **Containerization**: Docker & Docker Compose

---

## Repository Structure

```
AngkorLance/
├── backend/              # Spring Boot application
│   ├── src/
│   ├── Dockerfile        # Backend Dockerfile (dev/prod compatible)
│   └── pom.xml
│
├── frontend/             # React (Vite) application
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── docker-compose.dev.yml
└── README.md
```

---

## Prerequisites

Make sure the following are installed:

- **Docker** (with Docker Compose)
- **Node.js 18+** (for frontend dev)
- **Java 21** (optional if not using Docker for backend)

---

## Development Environment Overview

In development:

- **Backend** runs inside Docker
- **PostgreSQL** runs inside Docker
- **Frontend** runs locally using Vite (`npm run dev`)
- **Nginx is NOT used in development**

This setup gives fast frontend hot‑reload while keeping backend + DB consistent.

---

## Running the Backend + Database (Docker)

From the project root:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:

- Build and start the Spring Boot backend
- Start PostgreSQL
- Expose backend on **http://localhost:8080**
- Expose database on **localhost:5432**

### Test Backend

Open in browser or Postman:

```
http://localhost:8080/api/health
```

Expected response:

```
Backend is running
```

---

## Running the Frontend (Vite)

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## Backend ↔ Frontend Communication

- Frontend calls backend via:

```
http://localhost:8080/api/**
```

- CORS must be enabled in Spring Boot for development
- No reverse proxy is used in dev

---

## File Uploads (Dev)

- Uploaded files are stored on the **backend container filesystem**
- Mapped to local directory:

```
backend/uploads
```

- This directory is mounted via Docker volume
- Files persist between container restarts

---

## Why Nginx Is Not Used in Dev

- Vite provides its own dev server
- Hot reload is significantly faster
- Nginx is only used in **production** to:
  - Serve static frontend files
  - Reverse proxy `/api` requests to Spring Boot

---

## Common Issues

### Whitelabel Error Page at `/`

This is expected.

- Backend does not serve `/`
- Backend only handles `/api/**`

### Port Conflicts

- Ensure ports **8080**, **5432**, and **5173** are free

---

## Next Steps

- Add domain models (User, Job, Proposal)
- Implement authentication
- Configure production Docker Compose
- Add Nginx production configuration

---

## License

MIT (temporary)

