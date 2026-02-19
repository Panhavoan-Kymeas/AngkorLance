package com.angkorlance.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.angkorlance.backend.dto.ClientJobResponseDto;
import com.angkorlance.backend.dto.JobCreateRequestDTO;
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
                        : 0
            ))
            .toList();
}


}
