package com.angkorlance.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Stores uploaded images on the local filesystem.
 *
 * <p>Hardening applied:
 * <ul>
 *   <li>The client-supplied filename is never used. Files are stored as
 *       {@code <uuid>.<ext>} where the extension is derived from a validated
 *       content type, which removes any path-traversal surface.</li>
 *   <li>Only a small allow-list of image types is accepted, verified by magic
 *       bytes (not by the {@code Content-Type} header, which the client controls).</li>
 *   <li>An explicit size cap is enforced in addition to the servlet multipart limit.</li>
 *   <li>The resolved target path is asserted to stay inside the upload directory.</li>
 * </ul>
 */
@Service
public class FileStorageService {

    /** Hard cap independent of {@code spring.servlet.multipart.max-file-size}. */
    private static final long MAX_BYTES = 5L * 1024 * 1024; // 5 MB

    private static final Map<String, String> ALLOWED = Map.of(
            "image/png", "png",
            "image/jpeg", "jpg",
            "image/webp", "webp");

    private final Path uploadDir;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDirProperty) {
        this.uploadDir = Paths.get(uploadDirProperty).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException e) {
            throw new IllegalStateException("Could not create upload directory: " + this.uploadDir, e);
        }
    }

    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file was uploaded");
        }
        if (file.getSize() > MAX_BYTES) {
            throw new IllegalArgumentException("Image exceeds the maximum size of 5 MB");
        }

        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (IOException e) {
            throw new IllegalStateException("Could not read uploaded file", e);
        }

        String detectedType = sniffImageType(bytes);
        if (detectedType == null) {
            throw new IllegalArgumentException(
                    "Unsupported image type. Allowed types: PNG, JPEG, WEBP");
        }

        String ext = ALLOWED.get(detectedType);
        String filename = UUID.randomUUID() + "." + ext;
        Path target = uploadDir.resolve(filename).normalize();

        // Defence in depth: the resolved path must not escape the upload directory.
        if (!target.startsWith(uploadDir)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        try {
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store uploaded file", e);
        }

        // Public URL served by WebConfig / the reverse proxy.
        return "/uploads/" + filename;
    }

    /**
     * Returns the canonical MIME type if the leading bytes match a supported
     * image format, otherwise {@code null}.
     */
    private static String sniffImageType(byte[] b) {
        if (b.length >= 8
                && (b[0] & 0xFF) == 0x89 && b[1] == 0x50 && b[2] == 0x4E && b[3] == 0x47
                && b[4] == 0x0D && b[5] == 0x0A && b[6] == 0x1A && b[7] == 0x0A) {
            return "image/png";
        }
        if (b.length >= 3
                && (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 && (b[2] & 0xFF) == 0xFF) {
            return "image/jpeg";
        }
        if (b.length >= 12
                && b[0] == 'R' && b[1] == 'I' && b[2] == 'F' && b[3] == 'F'
                && b[8] == 'W' && b[9] == 'E' && b[10] == 'B' && b[11] == 'P') {
            return "image/webp";
        }
        return null;
    }
}
