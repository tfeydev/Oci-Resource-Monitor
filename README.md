# OCI Resource Monitor

A lightweight monitoring application for **Oracle Cloud Infrastructure (OCI)**.\
This project provides a simple interface to view and analyze OCI resources such as compute instances, object storage, and network usage.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Example IAM Policy](#example-iam-policy)
- [Certification Notes](#certification-notes)
- [Roadmap](#roadmap)
- [Backend Service](#backend-service)
  - [Overview](#overview)
  - [Architecture](#architecture)
  - [Build & Run](#build--run)
  - [Configuration](#configuration)
  - [API Endpoints](#api-endpoints)
  - [Example Flows](#example-flows)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 📊 **Dashboard**: Real-time monitoring of OCI resources
- 💾 **Object Storage**: Track buckets and stored objects
- ⚙️ **Compute**: Monitor VM instances, CPU, and memory usage
- 🌐 **Networking**: Basic VCN and subnet monitoring
- 🔒 **Authentication**: Uses OCI config profiles with restricted permissions for security

[↑ Back to top](#oci-resource-monitor)

---

## Project Structure

```
.
├── backend/               # Spring Boot backend service
│   ├── src/main/java/     # Java source code
│   └── pom.xml            # Maven configuration
├── frontend/              # React frontend application
│   ├── src/               # React components and pages
│   └── package.json       # NPM dependencies
├── cert/                  # Certification study notes (Markdown)
│   └── oci_foundations/   # OCI Foundation structured summaries
└── README.md              # Project documentation
```

[↑ Back to top](#oci-resource-monitor)

---

## Tech Stack

- **Backend**: Java 21, Spring Boot, OCI Java SDK
- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Database**: Oracle XE (local testing)
- **Build Tools**: Maven (backend), npm/yarn (frontend)

[↑ Back to top](#oci-resource-monitor)

---

## Setup

### Prerequisites

- JDK 17+
- Node.js 18+
- Oracle Cloud account (Always Free works)
- OCI CLI configured with a user and API key

[↑ Back to top](#oci-resource-monitor)

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

[↑ Back to top](#oci-resource-monitor)

### Frontend

```bash
cd frontend
npm install
npm start
```

- Frontend runs on [http://localhost:3000](http://localhost:3000)
- Backend runs on [http://localhost:8080](http://localhost:8080)

[↑ Back to top](#oci-resource-monitor)

---

## Usage

1. Configure your `~/.oci/config` with the correct profile
2. Assign minimal read-only policies for the monitoring user in OCI IAM
3. Launch backend and frontend
4. Log in using the shared OCI profile credentials

[↑ Back to top](#oci-resource-monitor)

---

## Example IAM Policy

```hcl
ALLOW GROUP MonitorUsers TO READ instances IN TENANCY
ALLOW GROUP MonitorUsers TO READ buckets IN TENANCY
ALLOW GROUP MonitorUsers TO READ compartments IN TENANCY
```

[↑ Back to top](#oci-resource-monitor)

---

## Certification Notes

- Structured study notes for **OCI Foundations Associate (1Z0-1085-25)** included in `cert/`
- Module-wise, exam-oriented summaries, diagrams, and practice questions

[↑ Back to top](#oci-resource-monitor)

---

## Roadmap

-

[↑ Back to top](#oci-resource-monitor)

---

## Backend Service

### Overview

This service connects to OCI and retrieves metrics for compute, storage, and networking resources.\
Exposes REST APIs for dashboards or external integrations.

[↑ Back to top](#oci-resource-monitor)

### Architecture

- Spring Boot (Java 21) for REST APIs
- OCI Java SDK for communication with OCI
- Maven for build and dependency management
- Layered structure: `controller` → `service` → `repository`

[↑ Back to top](#oci-resource-monitor)

### Build & Run

```bash
# Build
mvn clean package

# Run
java -jar target/oci-monitor-0.0.1-SNAPSHOT.jar
```

[↑ Back to top](#oci-resource-monitor)

### Configuration

- Uses standard OCI CLI config file (`~/.oci/config`)
- Profile can be set via environment variable:

```bash
export OCI_PROFILE=MONITOR-PROJECT
```

[↑ Back to top](#oci-resource-monitor)

### API Endpoints

- `GET /api/storage/buckets` – List Object Storage buckets
- `GET /api/storage/buckets/{bucket}/objects` – List objects in a bucket
- `GET /api/resources` – Snapshot of aggregated resources
- `GET /api/networking/vcns` – List Virtual Cloud Networks (VCNs)
- `GET /api/metrics/memory` – Memory utilization metrics
- `GET /api/metrics/cpu` – CPU utilization metrics
- `GET /api/identity/policies` – IAM policies

[↑ Back to top](#oci-resource-monitor)

### Example Flows

```bash
curl -s "http://localhost:8080/api/storage/buckets" -H "Accept: application/json"
curl -s "http://localhost:8080/api/storage/buckets/<BUCKET_NAME>/objects" -H "Accept: application/json"
curl -s "http://localhost:8080/api/resources" -H "Accept: application/json"
curl -s "http://localhost:8080/api/metrics/cpu" -H "Accept: application/json"
curl -s "http://localhost:8080/api/metrics/memory" -H "Accept: application/json"
curl -s "http://localhost:8080/api/networking/vcns" -H "Accept: application/json"
curl -s "http://localhost:8080/api/identity/policies" -H "Accept: application/json"
```

[↑ Back to top](#oci-resource-monitor)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit changes (`git commit -m "Add feature xyz"`)
4. Push branch (`git push origin feature/xyz`)
5. Open a Pull Request

[↑ Back to top](#oci-resource-monitor)

---

## License

MIT License – See `LICENSE` file for details

[↑ Back to top](#oci-resource-monitor)

