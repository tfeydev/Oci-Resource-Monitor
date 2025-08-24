package techthor.ocimonitor.dto;

/**
 * Data Transfer Object for representing an OCI Object inside a Bucket.
 */
public record OciObjectDto(String name, long size, String etag) {}
