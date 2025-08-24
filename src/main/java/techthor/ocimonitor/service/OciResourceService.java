package techthor.ocimonitor.service;

import org.springframework.stereotype.Service;
import techthor.ocimonitor.dao.ObjectStorageDao;
import techthor.ocimonitor.dto.OciObjectDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Facade service that aggregates and orchestrates calls to multiple OCI-related domain services.
 * <p>
 * Acts as the single integration point for controllers that need combined data from:
 * <ul>
 *   <li>{@link DashboardService} – compute, networking, IAM, and metrics</li>
 *   <li>{@link ObjectStorageDao} – bucket listings and object metadata</li>
 * </ul>
 * This reduces coupling in the controller layer and provides a high-level API to
 * fetch related OCI resource data in one shot.
 */
@Service
public class OciResourceService {

    private final DashboardService dashboardService;
    private final ObjectStorageDao objectStorageDao;

    /**
     * Constructs the OciResourceService with its dependent domain services.
     *
     * @param dashboardService  service providing compute, networking, IAM and metric operations
     * @param objectStorageDao  DAO providing direct access to Object Storage API
     */
    public OciResourceService(DashboardService dashboardService,
                              ObjectStorageDao objectStorageDao) {
        this.dashboardService = dashboardService;
        this.objectStorageDao = objectStorageDao;
    }

    /**
     * Retrieves a consolidated snapshot of OCI resources suitable for a dashboard view.
     * <p>
     * Includes:
     * <ul>
     *   <li>Compute instances</li>
     *   <li>CPU and memory metrics</li>
     *   <li>VCNs</li>
     *   <li>IAM policies, compartments, and domains</li>
     *   <li>Object Storage buckets</li>
     * </ul>
     *
     * @return a map keyed by section name containing the relevant data
     */
    public Map<String, Object> getDashboardSnapshot() {
        Map<String, Object> snapshot = new HashMap<>();
        snapshot.put("computeInstances", dashboardService.getResources());
        snapshot.put("cpuMetrics", dashboardService.getCpuMetrics());
        snapshot.put("memoryMetrics", dashboardService.getMemoryMetrics());
        snapshot.put("vcns", dashboardService.getVcns());
        snapshot.put("policies", dashboardService.getPolicies());
        snapshot.put("compartments", dashboardService.getCompartments());
        snapshot.put("domains", dashboardService.getDomains());
        snapshot.put("buckets", objectStorageDao.listBuckets());
        return snapshot;
    }

    /**
     * Builds an inventory of all objects within all buckets in the tenancy.
     * <p>
     * Uses {@link ObjectStorageDao} to fetch the bucket list, then delegates
     * to an Object Service (if implemented) to fetch objects for each bucket.
     *
     * @return a map keyed by bucket name with a list of {@link OciObjectDto} entries
     */
    public Map<String, List<OciObjectDto>> getObjectsByBucket() {
        Map<String, List<OciObjectDto>> inventory = new HashMap<>();
        objectStorageDao.listBuckets().forEach(bucket -> {
            // For now we stub empty lists — replace with real object listing when available
            inventory.put(bucket.getName(), List.of());
        });
        return inventory;
    }
}
