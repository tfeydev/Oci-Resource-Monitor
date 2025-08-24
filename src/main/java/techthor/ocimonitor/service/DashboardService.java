package techthor.ocimonitor.service;

import com.oracle.bmc.ConfigFileReader;
import com.oracle.bmc.auth.AuthenticationDetailsProvider;
import com.oracle.bmc.auth.ConfigFileAuthenticationDetailsProvider;
import com.oracle.bmc.core.ComputeClient;
import com.oracle.bmc.core.VirtualNetworkClient;
import com.oracle.bmc.core.requests.ListInstancesRequest;
import com.oracle.bmc.core.requests.ListVcnsRequest;
import com.oracle.bmc.identity.IdentityClient;
import com.oracle.bmc.identity.requests.ListCompartmentsRequest;
import com.oracle.bmc.identity.requests.ListDomainsRequest;
import com.oracle.bmc.identity.requests.ListPoliciesRequest;
import com.oracle.bmc.monitoring.MonitoringClient;
import com.oracle.bmc.monitoring.model.MetricData;
import com.oracle.bmc.monitoring.model.SummarizeMetricsDataDetails;
import com.oracle.bmc.monitoring.requests.SummarizeMetricsDataRequest;
import com.oracle.bmc.monitoring.responses.SummarizeMetricsDataResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Service class that encapsulates business logic for retrieving:
 * - Compute instance information
 * - CPU and memory metrics
 * - Networking resources (VCNs)
 * - IAM resources (policies, compartments, domains)
 * <p>
 * Uses OCI Java SDK 3.72.0 and loads credentials from the default OCI config.
 */
@Service
public class DashboardService {

    private final String compartmentOcid;
    private final AuthenticationDetailsProvider provider;

    private final ComputeClient computeClient;
    private final MonitoringClient monitoringClient;
    private final IdentityClient identityClient;
    private final VirtualNetworkClient virtualNetworkClient;

    /**
     * Initializes OCI SDK clients using credentials from ~/.oci/config (DEFAULT profile).
     *
     * @param compartmentOcid The OCID of the compartment to operate on.
     * @throws IOException if the OCI config file cannot be read.
     */
    public DashboardService(@Value("${oci.compartment.ocid}") String compartmentOcid) throws IOException {
        ConfigFileReader.ConfigFile configFile = ConfigFileReader.parseDefault();
        this.provider = new ConfigFileAuthenticationDetailsProvider(configFile);
        this.compartmentOcid = compartmentOcid;

        // Create clients for various OCI services
        this.computeClient = ComputeClient.builder().build(provider);
        this.monitoringClient = MonitoringClient.builder().build(provider);
        this.identityClient = IdentityClient.builder().build(provider);
        this.virtualNetworkClient = VirtualNetworkClient.builder().build(provider);
    }

    /**
     * Retrieves compute instances in the configured compartment.
     *
     * @return List of maps: id, name, status.
     */
    public List<Map<String, Object>> getResources() {
        try {
            return computeClient.listInstances(
                            ListInstancesRequest.builder()
                                    .compartmentId(compartmentOcid)
                                    .build())
                    .getItems()
                    .stream()
                    .map(instance -> {
                        Map<String, Object> resource = new HashMap<>();
                        resource.put("id", instance.getId());
                        resource.put("name", instance.getDisplayName());
                        resource.put("status", instance.getLifecycleState().getValue());
                        return resource;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to fetch compute instances: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Retrieves average CPU utilization for the last hour.
     *
     * @return List of metric time series.
     */
    public List<Map<String, Object>> getCpuMetrics() {
        return getMetricsData("CpuUtilization[1m].mean()");
    }

    /**
     * Retrieves average memory utilization for the last hour.
     *
     * @return List of metric time series.
     */
    public List<Map<String, Object>> getMemoryMetrics() {
        return getMetricsData("MemoryUtilization[1m].mean()");
    }

    /**
     * Queries the Monitoring service and converts results to labeled series.
     *
     * @param query OCI Monitoring Query Language (MQL) expression.
     * @return List of series maps with 'label' and 'points'.
     */
    private List<Map<String, Object>> getMetricsData(String query) {
        try {
            Date now = new Date();
            Date oneHourAgo = new Date(now.getTime() - TimeUnit.HOURS.toMillis(1));

            // Build the details of the metric query.
            SummarizeMetricsDataDetails details = SummarizeMetricsDataDetails.builder()
                    .namespace("oci_computeagent") // Most instance metrics use this namespace
                    .query(query)
                    .startTime(oneHourAgo)
                    .endTime(now)
                    .build();

            // The compartment OCID is passed in the request, not in the details object.
            SummarizeMetricsDataRequest request = SummarizeMetricsDataRequest.builder()
                    .compartmentId(compartmentOcid)
                    .summarizeMetricsDataDetails(details)
                    .build();

            SummarizeMetricsDataResponse response = monitoringClient.summarizeMetricsData(request);
            List<MetricData> items = response.getItems();

            if (items == null) {
                return Collections.emptyList();
            }

            // Convert the metric data into a list of maps for the controller.
            return items.stream()
                    .map(metricData -> {
                        Map<String, Object> series = new HashMap<>();
                        // No getName() in 3.72.0 → use query as label
                        series.put("label", query);
                        series.put("points", metricData.getAggregatedDatapoints().stream()
                                .map(dp -> Map.of(
                                        "t", dp.getTimestamp().getTime(),
                                        "v", dp.getValue()))
                                .collect(Collectors.toList()));
                        return series;
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            System.err.println("Failed to fetch metrics: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Retrieves VCNs in the configured compartment.
     *
     * @return List of maps: id, displayName.
     */
    public List<Map<String, String>> getVcns() {
        try {
            return virtualNetworkClient.listVcns(
                            ListVcnsRequest.builder()
                                    .compartmentId(compartmentOcid)
                                    .build())
                    .getItems()
                    .stream()
                    .map(vcn -> Map.of(
                            "id", vcn.getId(),
                            "displayName", vcn.getDisplayName()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to fetch VCNs: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Retrieves IAM policies in the configured compartment.
     *
     * @return List of maps: id, name.
     */
    public List<Map<String, String>> getPolicies() {
        try {
            return identityClient.listPolicies(
                            ListPoliciesRequest.builder()
                                    .compartmentId(compartmentOcid)
                                    .build())
                    .getItems()
                    .stream()
                    .map(policy -> Map.of(
                            "id", policy.getId(),
                            "name", policy.getName()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to fetch policies: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Retrieves all compartments in the tenancy.
     *
     * @return List of maps: id, name.
     */
    public List<Map<String, String>> getCompartments() {
        try {
            return identityClient.listCompartments(
                            ListCompartmentsRequest.builder()
                                    .compartmentId(provider.getTenantId()) // root tenancy OCID
                                    .build())
                    .getItems()
                    .stream()
                    .map(compartment -> Map.of(
                            "id", compartment.getId(),
                            "name", compartment.getName()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to fetch compartments: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    /**
     * Retrieves identity domains in the tenancy.
     *
     * @return List of maps: id, name.
     */
    public List<Map<String, String>> getDomains() {
        try {
            return identityClient.listDomains(
                            ListDomainsRequest.builder()
                                    .compartmentId(provider.getTenantId()) // root tenancy OCID
                                    .build())
                    .getItems()
                    .stream()
                    .map(domain -> Map.of(
                            "id", domain.getId(),
                            "name", domain.getDisplayName()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to fetch domains: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}
