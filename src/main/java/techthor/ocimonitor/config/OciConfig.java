package techthor.ocimonitor.config;

import com.oracle.bmc.auth.AuthenticationDetailsProvider;
import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.ConfigFileReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Spring configuration that sets up authentication for OCI SDK clients.
 * <p>
 * Reads from the standard OCI config file (~/.oci/config by default)
 * and uses the "DEFAULT" profile to authenticate.
 */
@Configuration
public class OciConfig {

    /**
     * Creates an AuthenticationDetailsProvider bean from the OCI config file.
     * This provider will be injected into OCI service client beans.
     */
    @Bean
    public AuthenticationDetailsProvider authProvider() throws Exception {
        return new ConfigFileAuthenticationDetailsProvider(
                ConfigFileReader.DEFAULT_FILE_PATH, // ~/.oci/config
                "DEFAULT" // Profile name in the config file
        );
    }
}
