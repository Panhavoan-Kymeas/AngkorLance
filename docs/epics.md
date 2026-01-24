# AnkorLance Mini Freelance Marketplace Epics & User Stories

## Epic 1: Authentication & User Management
**Goal:** Allow users to register, login, and manage accounts with role-based access.

**User Stories:**
- As a user, I want to register with my name, email, password, and role so I can access the system. (FR-1)
- As a user, I want to log in and log out securely so I can access my account. (FR-2)
- As a user, I want access to system features restricted by role so that I only see what I’m allowed. (FR-3)

## Epic 2: Job Management (Client)
**Goal:** Allow clients to create, manage, and complete job posts.

**User Stories:**
- As a client, I want to create a job post with title, description, category, and budget so freelancers can submit proposals. (FR-4)
- As a client, I want to view a list of my own job posts so I can track them. (FR-5)
- As a client, I want to update or delete a job post only if no proposal is accepted so I maintain control. (FR-6)
- As a system, a new job should have an initial status of OPEN. (FR-7)

## Epic 3: Job Browsing (Freelancer)
**Goal:** Allow freelancers to find and filter job posts.

**User Stories:**
- As a freelancer, I want to view all job posts with status OPEN so I can find work. (FR-8)
- As a freelancer, I want to filter job listings by category so I can find relevant jobs. (FR-9)
- As a freelancer, I should not see job posts marked as COMPLETED. (FR-10)

## Epic 4: Proposal Management (Freelancer)
**Goal:** Allow freelancers to submit proposals and track them.

**User Stories:**
- As a freelancer, I want to submit a proposal for an OPEN job with a message and proposed price. (FR-11)
- As a system, a freelancer cannot submit more than one proposal for the same job. (FR-12)
- As a system, each submitted proposal should have an initial status of PENDING. (FR-13)

## Epic 5: Proposal Review and Acceptance (Client)
**Goal:** Allow clients to review and accept proposals.

**User Stories:**
- As a client, I want to view all proposals submitted for my jobs so I can make a decision. (FR-14)
- As a client, I can accept only one proposal per job. (FR-15)
- As a system, when a proposal is accepted:
  - the accepted proposal becomes ACCEPTED
  - all other proposals become REJECTED
  - the job status changes to IN_PROGRESS (FR-16)

## Epic 6: Job Completion
**Goal:** Allow clients to mark jobs as completed.

**User Stories:**
- As a client, I want to mark a job as COMPLETED only if its status is IN_PROGRESS. (FR-17, FR-18)

## Epic 7: Freelancer Dashboard
**Goal:** Allow freelancers to track their proposals and job statuses.

**User Stories:**
- As a freelancer, I want to view my submitted proposals, their statuses, and associated job status so I can track my work. (FR-19)

## Epic 8: Authorization Rules
**Goal:** Enforce role-based access control.

**User Stories:**
- As a user, I should only access and modify data I own. (FR-20)
- As a client, I cannot submit proposals. (FR-21)
- As a freelancer, I cannot create or manage job posts. (FR-22)

## Epic 9: Image Management
**Goal:** Allow users to upload profile and job images securely.

**User Stories:**
- As a user, I can upload a profile image. (FR-29)
- As a user, I can update or replace my own profile image. (FR-30)
- As a client, I can upload one image per job post. (FR-33)
- As a client, I can update/delete a job image only if the job is OPEN. (FR-34)
- As a system, only valid image formats (JPG, PNG, JPEG) are accepted and size limits enforced. (FR-26, FR-27)
- As a system, images are stored on the server filesystem and only the URL/path is stored in DB. (FR-24, FR-25)

## Notes
- Job Lifecycle: OPEN → IN_PROGRESS → COMPLETED (FR-17, FR-18)
- Out-of-scope for MVP: Payments, messaging, ratings, notifications, admin moderation.
