// This controller is lean and delegates all tasks to the DashboardService.

package techthor.ocimonitor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import techthor.ocimonitor.service.DashboardService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService service;

    // The controller injects the service via the constructor
    public DashboardController(DashboardService service) {
        this.service = service;
    }

    // Returns a list of compute resources
    @GetMapping("/resources")
    public List<Map<String, Object>> getResources() {
        return service.getResources();
    }

    // Returns recent CPU metrics
    @GetMapping("/metrics/cpu")
    public List<Map<String, Object>> getCpuMetrics() {
        return service.getCpuMetrics();
    }

    // Returns recent memory metrics
    @GetMapping("/metrics/memory")
    public List<Map<String, Object>> getMemoryMetrics() {
        return service.getMemoryMetrics();
    }

    // Returns networking VCN information
    @GetMapping("/networking/vcns")
    public List<Map<String, String>> getVcns() {
        return service.getVcns();
    }

    // Returns IAM policies
    @GetMapping("/identity/policies")
    public List<Map<String, String>> getPolicies() {
        return service.getPolicies();
    }
}
