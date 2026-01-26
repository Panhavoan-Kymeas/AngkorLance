CREATE TABLE images (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,  -- 'PROFILE' or 'JOB'
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, type),       -- only one profile image per user
    UNIQUE(job_id, type)         -- only one image per job
);
