package techthor.ocimonitor.config;

import com.oracle.bmc.auth.AuthenticationDetailsProvider;
import com.oracle.bmc.identity.Identity;
import com.oracle.bmc.identity.IdentityClient;
import com.oracle.bmc.objectstorage.ObjectStorage;
import com.oracle.bmc.objectstorage.ObjectStorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Spring configuration for OCI service clients.
 * <p>
 * Exposes OCI SDK clients as Spring beans so they can be injected
 * wherever needed (DAOs, services, etc.).
 */
@Configuration
public class OciClientConfig {

    /**
     * Creates an OCI Object Storage client.
     * @param authProvider the authentication provider bean
     * @return configured ObjectStorage client
     */
    @Bean
    public ObjectStorage objectStorageClient(AuthenticationDetailsProvider authProvider) {
        return new ObjectStorageClient(authProvider);
    }

    /**
     * Creates an OCI Identity client.
     * @param authProvider the authentication provider bean
     * @return configured Identity client
     */
    @Bean
    public Identity identityClient(AuthenticationDetailsProvider authProvider) {
        return new IdentityClient(authProvider);
    }

    /**
     * Exposes tenancy OCID from properties as a Spring bean.
     * This allows injection without hard-coding.
     */
    @Bean
    public String tenancyOcid(@Value("${oci.tenancy.ocid}") String tenancyOcid) {
        return tenancyOcid;
    }
}
