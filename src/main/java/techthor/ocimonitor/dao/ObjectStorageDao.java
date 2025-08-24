package techthor.ocimonitor.dao;

import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.objectstorage.ObjectStorageClient;
import com.oracle.bmc.objectstorage.model.BucketSummary;
import com.oracle.bmc.objectstorage.requests.GetNamespaceRequest;
import com.oracle.bmc.objectstorage.requests.ListBucketsRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public class ObjectStorageDao {

    private final ObjectStorageClient client;
    private final String tenancyOcid; // <-- Root-OCID hier

    public ObjectStorageDao(
            @Value("${oci.config.path}") String configPath,
            @Value("${oci.profile}") String profile,
            @Value("${oci.tenancy.ocid}") String tenancyOcid // aus application.properties
    ) throws IOException {
        var provider = new ConfigFileAuthenticationDetailsProvider(configPath, profile);
        this.client = new ObjectStorageClient(provider);
        this.tenancyOcid = tenancyOcid;
    }

    public List<BucketSummary> listBuckets() {
        String namespace = client.getNamespace(GetNamespaceRequest.builder().build()).getValue();

        return client.listBuckets(
                ListBucketsRequest.builder()
                        .namespaceName(namespace)
                        .compartmentId(tenancyOcid) // Root-Scope verwenden
                        .build()
        ).getItems();
    }
}
