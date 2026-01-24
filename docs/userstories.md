# AnkorLance Mini Freelance Marketplace - User Stories (BDD/Structured)

## User Story 1: User Registration
**As a** new user  
**I need** to register with name, email, password, and role (Client or Freelancer)  
**So that** I can access the system with the correct role

### Details and Assumptions
- Users choose exactly one role at registration.
- Email must be unique.
- Password must meet security requirements.

### Acceptance Criteria
1. **Given** a new user provides valid registration data  
   **When** they submit the registration form  
   **Then** their account is created and stored in the database
2. **Given** the email already exists  
   **When** the user submits the registration form  
   **Then** an error is returned indicating duplicate email

## User Story 2: User Login
**As a** registered user  
**I need** to log in with email and password  
**So that** I can access my account and system features

### Details and Assumptions
- JWT token is issued upon successful login.
- Role is included in the token for authorization.

### Acceptance Criteria
1. **Given** valid credentials  
   **When** the user logs in  
   **Then** a JWT token is returned and user session is active
2. **Given** invalid credentials  
   **When** the user logs in  
   **Then** an error message is returned and login fails

## User Story 3: Role-Based Access
**As a** system user  
**I need** access restricted based on my role  
**So that** I can only perform actions I am allowed

### Details and Assumptions
- Clients cannot submit proposals.
- Freelancers cannot manage job posts.

### Acceptance Criteria
1. **Given** a client tries to submit a proposal  
   **When** they access the proposal endpoint  
   **Then** access is denied
2. **Given** a freelancer tries to create a job post  
   **When** they access the job creation endpoint  
   **Then** access is denied

## User Story 4: Job Creation (Client)
**As a** client  
**I need** to create a job post with title, description, category, and budget  
**So that** freelancers can view and submit proposals

### Details and Assumptions
- Job status defaults to OPEN.
- Only clients can create jobs.

### Acceptance Criteria
1. **Given** valid job details  
   **When** a client submits the job creation form  
   **Then** the job is stored in the database with status OPEN
2. **Given** invalid or missing fields  
   **When** the client submits the form  
   **Then** an error is returned and job is not created

## User Story 5: View Job Posts (Client)
**As a** client  
**I need** to view a list of my job posts  
**So that** I can track and manage them

### Details and Assumptions
- Only the client’s own jobs are visible.

### Acceptance Criteria
1. **Given** the client has created jobs  
   **When** they view their job list  
   **Then** all jobs created by the client are displayed

## User Story 6: Update/Delete Job Post (Client)
**As a** client  
**I need** to update or delete a job post if no proposal is accepted  
**So that** I can manage my postings

### Details and Assumptions
- Jobs with accepted proposals cannot be modified or deleted.

### Acceptance Criteria
1. **Given** a job has no accepted proposals  
   **When** the client updates or deletes it  
   **Then** the changes are applied
2. **Given** a job has an accepted proposal  
   **When** the client tries to update or delete it  
   **Then** an error is returned and the job remains unchanged

## User Story 7: Browse Jobs (Freelancer)
**As a** freelancer  
**I need** to view all OPEN job posts  
**So that** I can find jobs to submit proposals for

### Details and Assumptions
- Only jobs with status OPEN are visible.
- Completed jobs are hidden.

### Acceptance Criteria
1. **Given** there are OPEN jobs  
   **When** a freelancer views the job list  
   **Then** all OPEN jobs are displayed
2. **Given** a job is COMPLETED  
   **When** a freelancer views the job list  
   **Then** that job is not shown

## User Story 8: Filter Jobs by Category (Freelancer)
**As a** freelancer  
**I need** to filter job listings by category  
**So that** I can find jobs relevant to my skills

### Details and Assumptions
- Categories are predefined in the system.

### Acceptance Criteria
1. **Given** multiple jobs exist in different categories  
   **When** the freelancer applies a category filter  
   **Then** only jobs in that category are displayed

## User Story 9: Submit Proposal (Freelancer)
**As a** freelancer  
**I need** to submit a proposal with a message and proposed price for an OPEN job  
**So that** the client can consider hiring me

### Details and Assumptions
- Each freelancer can submit only one proposal per job.
- Proposal status defaults to PENDING.

### Acceptance Criteria
1. **Given** the job is OPEN  
   **When** the freelancer submits a proposal  
   **Then** the proposal is stored with status PENDING
2. **Given** the freelancer already submitted a proposal for this job  
   **When** they try to submit again  
   **Then** the system rejects it

## User Story 10: View Proposals (Client)
**As a** client  
**I need** to view all proposals submitted for my job  
**So that** I can choose one to accept

### Details and Assumptions
- Clients see proposals only for their own jobs.

### Acceptance Criteria
1. **Given** proposals exist for a job  
   **When** the client views them  
   **Then** all proposals for that job are displayed

## User Story 11: Accept Proposal (Client)
**As a** client  
**I need** to accept one proposal per job  
**So that** the job can proceed to IN_PROGRESS

### Details and Assumptions
- Accepting a proposal sets its status to ACCEPTED, others to REJECTED.
- Job status changes from OPEN to IN_PROGRESS.

### Acceptance Criteria
1. **Given** multiple proposals for a job  
   **When** the client accepts one  
   **Then** that proposal is ACCEPTED, others are REJECTED, and job status is IN_PROGRESS

## User Story 12: Complete Job (Client)
**As a** client  
**I need** to mark a job as COMPLETED  
**So that** the job lifecycle is properly tracked

### Details and Assumptions
- Only jobs with status IN_PROGRESS can be completed.

### Acceptance Criteria
1. **Given** a job is IN_PROGRESS  
   **When** the client marks it as COMPLETED  
   **Then** the job status is updated to COMPLETED

## User Story 13: Freelancer Dashboard
**As a** freelancer  
**I need** to view my submitted proposals and job statuses  
**So that** I can track my work

### Details and Assumptions
- Shows proposal status (PENDING, ACCEPTED, REJECTED) and associated job status

### Acceptance Criteria
1. **Given** the freelancer has submitted proposals  
   **When** they view the dashboard  
   **Then** all proposals with current status and job info are displayed

## User Story 14: Upload Profile Image (User)
**As a** user  
**I need** to upload or replace my profile image  
**So that** it is displayed on relevant views

### Details and Assumptions
- Only one profile image per user.
- Supported formats: JPG, PNG, JPEG
- Maximum file size enforced

### Acceptance Criteria
1. **Given** the image meets format and size rules  
   **When** the user uploads it  
   **Then** the image is saved and visible
2. **Given** the image is invalid  
   **When** the user uploads it  
   **Then** the system rejects it

## User Story 15: Upload Job Image (Client)
**As a** client  
**I need** to upload one image per job post  
**So that** freelancers can view it with the job

### Details and Assumptions
- Job status must be OPEN to update/delete image.

### Acceptance Criteria
1. **Given** the job is OPEN and image is valid  
   **When** the client uploads or updates it  
   **Then** the image is stored and associated with the job
2. **Given** the job is not OPEN  
   **When** the client tries to update/delete image  
   **Then** the action is rejected

## Notes
- Job Lifecycle: OPEN → IN_PROGRESS → COMPLETED
- Out-of-scope for MVP: Payments, messaging, ratings, notifications, admin moderation
