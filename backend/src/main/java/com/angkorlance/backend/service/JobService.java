package com.angkorlance.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.angkorlance.backend.dto.ClientJobResponseDto;
import com.angkorlance.backend.dto.FreelancerJobResponseDto;
import com.angkorlance.backend.dto.JobCreateRequestDTO;
import com.angkorlance.backend.dto.JobDetailResponseDto;
import com.angkorlance.backend.dto.UpdateJobRequestDto;
import com.angkorlance.backend.entity.Image;
import com.angkorlance.backend.entity.Job;
import com.angkorlance.backend.entity.User;
import com.angkorlance.backend.repository.JobRepository;
import com.angkorlance.backend.repository.UserRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public JobService(JobRepository jobRepository, UserRepository userRepository,
            FileStorageService fileStorageService) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public Long createJob(JobCreateRequestDTO request, Long clientId) {

        User client = userRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setBudget(request.getBudget());
        job.setClient(client);
        job.setStatus("OPEN");
        job.setCreatedAt(LocalDateTime.now());
        job.setUpdatedAt(LocalDateTime.now());

        MultipartFile uploadedFile = request.getJobImage();
        if (uploadedFile != null && !uploadedFile.isEmpty()) {
            String path = fileStorageService.storeFile(uploadedFile);

            Image image = new Image();
            image.setFilePath(path);
            image.setType("JOB");
            image.setJob(job);

            job.setJobImage(image);
        }

        Job savedJob = jobRepository.save(job);
        return savedJob.getId();
    }

    public List<Job> getJobsByClient(Long clientId) {
        return jobRepository.findByClientId(clientId);
    }

    public List<ClientJobResponseDto> getClientJobs(Long clientId) {

        List<Job> jobs = jobRepository.findByClientId(clientId);

        return jobs.stream()
                .map(job -> new ClientJobResponseDto(
                        job.getId(),
                        job.getTitle(),
                        job.getCategory(),
                        job.getBudget(),
                        job.getStatus(),
                        job.getJobImage() != null
                                ? job.getJobImage().getFilePath()
                                : null,
                        job.getProposals() != null
                                ? job.getProposals().size()
                                : 0))
                .toList();
    }

    public void deleteJob(Long jobId, Long clientId) {

        Job job = jobRepository.findByIdAndClientId(jobId, clientId)
                .orElseThrow(() -> new RuntimeException("Job not found or not authorized"));

        if (!"OPEN".equals(job.getStatus())) {
            throw new RuntimeException("Only OPEN jobs can be deleted");
        }

        jobRepository.delete(job);
    }

    public ClientJobResponseDto updateJob(Long jobId, UpdateJobRequestDto dto, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Ensure this job belongs to the current client
        if (!job.getClient().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        // Only allow updates if job is OPEN
        if (!"OPEN".equals(job.getStatus())) {
            throw new RuntimeException("Cannot update job that is not OPEN");
        }

        // Update fields if provided
        if (dto.getTitle() != null)
            job.setTitle(dto.getTitle());
        if (dto.getDescription() != null)
            job.setDescription(dto.getDescription());
        if (dto.getCategory() != null)
            job.setCategory(dto.getCategory());
        if (dto.getBudget() != null)
            job.setBudget(dto.getBudget());

        job.setUpdatedAt(LocalDateTime.now());

        Job updatedJob = jobRepository.save(job);

        return mapToResponseDto(updatedJob); // map to ClientJobResponseDto
    }

    public ClientJobResponseDto mapToResponseDto(Job job) {
        String imagePath = null;

        // get job image path if exists
        Image jobImage = job.getJobImage();
        if (jobImage != null) {
            imagePath = jobImage.getFilePath();
        }

        int proposalCount = 0;
        if (job.getProposals() != null) {
            proposalCount = job.getProposals().size();
        }

        return new ClientJobResponseDto(
                job.getId(),
                job.getTitle(),
                job.getCategory(),
                job.getBudget(),
                job.getStatus(),
                imagePath,
                proposalCount);
    }

    public JobDetailResponseDto getJobDetail(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        String imagePath = null;
        if (job.getJobImage() != null) {
            imagePath = job.getJobImage().getFilePath();
        }

        int proposalCount = 0;
        if (job.getProposals() != null) {
            proposalCount = job.getProposals().size();
        }

        return new JobDetailResponseDto(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getCategory(),
                job.getBudget(),
                job.getStatus(),
                job.getCreatedAt(),
                job.getClient().getId(),
                job.getClient().getName(),
                imagePath,
                proposalCount);
    }

    public Page<FreelancerJobResponseDto> getOpenJobs(String category, Pageable pageable) {

        Page<Job> jobs;

        if (category != null && !category.isBlank()) {
            jobs = jobRepository.findByStatusAndCategoryIgnoreCaseContaining("OPEN", category, pageable);
        } else {
            jobs = jobRepository.findByStatus("OPEN", pageable);
        }

        return jobs.map(job -> new FreelancerJobResponseDto(
                job.getId(),
                job.getTitle(),
                job.getCategory(),
                job.getBudget(),
                job.getClient().getName(),
                job.getJobImage() != null
                        ? job.getJobImage().getFilePath()
                        : null));
    }

}
