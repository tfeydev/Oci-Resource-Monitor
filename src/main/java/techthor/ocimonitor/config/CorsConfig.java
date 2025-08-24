package techthor.ocimonitor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS (Cross-Origin Resource Sharing) configuration.
 * <p>
 * Allows your backend API (Spring MVC controllers) to be called
 * from a different origin (e.g., your React frontend running on localhost:5173).
 * Without this, browsers would block cross-origin requests.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Define CORS mappings for API endpoints.
     * @param registry Spring's CORS registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all API endpoints under /api
                .allowedOrigins("http://localhost:5173") // Frontend origin allowed to call this API
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP verbs allowed
                .allowedHeaders("*") // Allow all request headers
                .allowCredentials(true); // Include cookies/credentials in cross-site requests
    }
}
