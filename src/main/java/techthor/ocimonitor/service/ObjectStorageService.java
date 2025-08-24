package techthor.ocimonitor.service;

import com.oracle.bmc.identity.Identity;
import com.oracle.bmc.identity.model.Compartment;
import com.oracle.bmc.identity.requests.ListCompartmentsRequest;
import com.oracle.bmc.objectstorage.ObjectStorage;
import com.oracle.bmc.objectstorage.model.BucketSummary;
import com.oracle.bmc.objectstorage.model.ObjectSummary;
import com.oracle.bmc.objectstorage.requests.GetNamespaceRequest;
import com.oracle.bmc.objectstorage.requests.GetObjectRequest;
import com.oracle.bmc.objectstorage.requests.ListBucketsRequest;
import com.oracle.bmc.objectstorage.requests.ListObjectsRequest;
import com.oracle.bmc.objectstorage.responses.GetObjectResponse;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Service for OCI Object Storage operations such as listing buckets/objects
 * and retrieving object content. Also leverages Identity to enumerate
 * compartments for tenancy-wide bucket discovery.
 */
@Service
public class ObjectStorageService {

    private final ObjectStorage objectStorageClient;
    private final Identity identityClient;
    private final String tenancyOcid;

    /**
     * Creates a new ObjectStorageService with required clients.
     *
     * @param objectStorageClient OCI Object Storage client
     * @param identityClient      OCI Identity client (for compartment traversal)
     * @param tenancyOcid         Root tenancy OCID
     */
    public ObjectStorageService(ObjectStorage objectStorageClient,
                                Identity identityClient,
                                String tenancyOcid) {
        this.objectStorageClient = objectStorageClient;
        this.identityClient = identityClient;
        this.tenancyOcid = tenancyOcid;
    }

    /**
     * Reads and returns the full content of a specific object as bytes.
     *
     * @param bucketName the bucket that contains the object
     * @param objectName the object name
     * @return raw object bytes
     */
    public byte[] getObjectContent(String bucketName, String objectName) {
        String namespace = objectStorageClient.getNamespace(GetNamespaceRequest.builder().build()).getValue();

        GetObjectRequest request = GetObjectRequest.builder()
                .namespaceName(namespace)
                .bucketName(bucketName)
                .objectName(objectName)
                .build();

        GetObjectResponse response = objectStorageClient.getObject(request);

        try (InputStream inputStream = response.getInputStream();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to read object: " + objectName, e);
        }
    }

    /**
     * Lists all buckets across the entire tenancy (root and all accessible subcompartments).
     *
     * @return list of BucketSummary entries
     */
    public List<BucketSummary> listAllBucketsFromRoot() {
        String namespace = objectStorageClient.getNamespace(GetNamespaceRequest.builder().build()).getValue();

        Stream<String> allCompartmentIds = Stream.concat(
                Stream.of(tenancyOcid),
                identityClient.listCompartments(
                                ListCompartmentsRequest.builder()
                                        .compartmentId(tenancyOcid)
                                        .accessLevel(ListCompartmentsRequest.AccessLevel.Accessible)
                                        .compartmentIdInSubtree(true)
                                        .build()
                        ).getItems().stream()
                        .map(Compartment::getId)
        );

        return allCompartmentIds
                .flatMap(compId -> objectStorageClient.listBuckets(
                                ListBucketsRequest.builder()
                                        .namespaceName(namespace)
                                        .compartmentId(compId)
                                        .build()
                        ).getItems().stream()
                )
                .collect(Collectors.toList());
    }

    /**
     * Returns the names of all buckets across the tenancy.
     *
     * @return list of bucket names
     */
    public List<String> getAllBucketNames() {
        return listAllBucketsFromRoot()
                .stream()
                .map(BucketSummary::getName)
                .collect(Collectors.toList());
    }

    /**
     * Lists object names within a specific bucket.
     *
     * @param bucketName the bucket to list
     * @return list of object names
     */
    public List<String> getObjectNamesFromBucket(String bucketName) {
        String namespace = objectStorageClient.getNamespace(GetNamespaceRequest.builder().build()).getValue();

        return objectStorageClient.listObjects(
                        ListObjectsRequest.builder()
                                .namespaceName(namespace)
                                .bucketName(bucketName)
                                .build()
                ).getListObjects()
                .getObjects()
                .stream()
                .map(ObjectSummary::getName)
                .collect(Collectors.toList());
    }
}
