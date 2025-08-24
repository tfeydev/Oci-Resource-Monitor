# OCI Monitor – Backend Service

A Spring Boot based monitoring backend for Oracle Cloud Infrastructure (OCI).  
Provides REST APIs to fetch and aggregate metrics from OCI resources.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Build & Run](#build--run)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Example Flows](#example-flows)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This service connects to Oracle Cloud Infrastructure and retrieves metrics for compute, storage, and networking resources.  
It exposes REST APIs for use in dashboards or integration with external monitoring tools.

[↑ Back to top](#oci-monitor--backend-service)

---

## Architecture
- **Spring Boot (Java 17)** for REST APIs
- **OCI Java SDK** for communication with Oracle Cloud
- **Maven** for build and dependency management
- Layered structure: `controller` → `service` → `repository`

[↑ Back to top](#oci-monitor--backend-service)

---

## Prerequisites
- Java 17+
- Maven 3.8+
- OCI Account (can be Always Free)
- API Key configured in `~/.oci/config`

[↑ Back to top](#oci-monitor--backend-service)

---

## Build & Run
```bash
# Build
mvn clean package

# Run
java -jar target/oci-monitor-0.0.1-SNAPSHOT.jar
```

[↑ Back to top](#oci-monitor--backend-service)

---

## Configuration
The application uses the standard **OCI CLI config file** located in `~/.oci/config`.  
Profile can be set via environment variable:

```bash
export OCI_PROFILE=MONITOR-PROJECT
```

[↑ Back to top](#oci-monitor--backend-service)

---

## API Endpoints
### GET /api/storage/buckets
Lists all Object Storage buckets in the configured compartment/tenancy.

### GET /api/storage/buckets/{bucket}/objects
Lists objects inside the specified bucket.

### GET /api/resources
Returns a snapshot of aggregated monitored resources.

### GET /api/networking/vcns
Lists Virtual Cloud Networks (VCNs).

### GET /api/metrics/memory
Retrieves memory utilization metrics.

### GET /api/metrics/cpu
Retrieves CPU utilization metrics.

### GET /api/identity/policies
Lists IAM policies.

[↑ Back to top](#oci-monitor--backend-service)

---

## Example Flows

**List Buckets**
```bash
curl -s "http://localhost:8080/api/storage/buckets" -H "Accept: application/json"
```

**List Objects in a Bucket**
```bash
curl -s "http://localhost:8080/api/storage/buckets/<BUCKET_NAME>/objects" -H "Accept: application/json"
```

**Retrieve Aggregated Resources**
```bash
curl -s "http://localhost:8080/api/resources" -H "Accept: application/json"
```

**Get CPU Metrics**
```bash
curl -s "http://localhost:8080/api/metrics/cpu" -H "Accept: application/json"
```

**Get Memory Metrics**
```bash
curl -s "http://localhost:8080/api/metrics/memory" -H "Accept: application/json"
```

**List VCNs**
```bash
curl -s "http://localhost:8080/api/networking/vcns" -H "Accept: application/json"
```

**List IAM Policies**
```bash
curl -s "http://localhost:8080/api/identity/policies" -H "Accept: application/json"
```

[↑ Back to top](#oci-monitor--backend-service)

---

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit changes (`git commit -m "Add feature xyz"`)
4. Push branch (`git push origin feature/xyz`)
5. Open a Pull Request

[↑ Back to top](#oci-monitor--backend-service)

---

## License
MIT License

[↑ Back to top](#oci-monitor--backend-service)
