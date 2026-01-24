# AnkorLance MVP Features

This Markdown file lists the main features of the AnkorLance Mini Freelance Marketplace and the user stories associated with each feature.

## 1️⃣ Authentication & User Management
**Purpose:** Allow users to register, log in, and manage access based on role.

### User Stories
- US-001: User Registration
- US-002: User Login
- US-003: Role-Based Access / Authorization

### Details
- Each user has exactly one role (Client or Freelancer).
- JWT-based authentication.
- Role-based access control ensures users can only access permitted endpoints.

---

## 2️⃣ Job Management (Client)
**Purpose:** Allow clients to create, view, update, and manage job posts.

### User Stories
- US-004: Create Job Post
- US-005: View Own Job Posts
- US-006: Update/Delete Job Post
- US-012: Complete Job (Job Lifecycle)

### Details
- Job status starts as OPEN.
- Jobs with accepted proposals cannot be modified or deleted.
- Status transitions: OPEN → IN_PROGRESS → COMPLETED.

---

## 3️⃣ Job Browsing & Filtering (Freelancer)
**Purpose:** Allow freelancers to see available jobs and filter them.

### User Stories
- US-007: Browse OPEN Jobs
- US-008: Filter Jobs by Category

### Details
- Only OPEN jobs are visible to freelancers.
- Completed jobs are hidden.
- Category filtering helps freelancers find relevant jobs.

---

## 4️⃣ Proposal Management
**Purpose:** Allow freelancers to submit proposals and clients to review and accept them.

### User Stories
- US-009: Submit Proposal
- US-010: View Proposals
- US-011: Accept Proposal
- US-013: Freelancer Dashboard

### Details
- Freelancers can submit only one proposal per job.
- Proposal statuses: PENDING, ACCEPTED, REJECTED.
- Accepting a proposal sets job status to IN_PROGRESS.
- Dashboard shows proposal status and associated job info.

---

## 5️⃣ Image Management
**Purpose:** Allow users and clients to upload profile and job images.

### User Stories
- US-014: Upload Profile Image
- US-015: Upload Job Image

### Details
- Supported formats: JPG, PNG, JPEG
- Max file size enforced
- Only clients can manage job images.
- Profile images visible in relevant views.

---

## 6️⃣ Job Lifecycle
**Purpose:** Ensure correct transitions of job status through its lifecycle.

### User Stories
- US-011: Accept Proposal (triggers IN_PROGRESS)
- US-012: Complete Job

### Details
- Jobs follow sequential and irreversible status transitions: OPEN → IN_PROGRESS → COMPLETED.