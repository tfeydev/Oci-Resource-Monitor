# OCI Resource Monitor Dashboard

A modern, high‑performance **React + TypeScript + Vite** application for monitoring Oracle Cloud Infrastructure (OCI) resources in real time.  
It delivers live metrics for compute instances, networking, object storage, and identity services — all in a clean, responsive dashboard.

---

## 🚀 Features

- **Real‑Time Metrics** – CPU and memory usage with rolling averages.
- **Service Overview** – Quick insights into VCNs, policies, compartments, and domains.
- **Responsive UI** – Optimized for desktop and mobile devices.
- **Modular Architecture** – Feature‑based components for maintainability.
- **Type Safety** – Strong typing with TypeScript for fewer runtime errors.
- **Lightning‑Fast Dev Experience** – Powered by Vite’s HMR and optimized builds.

---

## 📂 Project Structure

```
src/
├── components/           # Reusable UI elements
├── pages/
│   └── Dashboard/        # Main dashboard view
│       ├── components/   # Dashboard‑specific components
│       └── Dashboard.tsx
├── hooks/                # Custom React hooks
├── services/             # API calls and data fetching
├── types/                # TypeScript type definitions
└── App.tsx
```

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/oci-resource-monitor.git
cd oci-resource-monitor

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📊 Usage

1. Configure your OCI API credentials in `.env`.
2. Start the dev server with `npm run dev`.
3. Open `http://localhost:5173/dashboard` in your browser.

---

## 🧩 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Chart.js / Recharts** – Metrics visualization
- **Axios** – API requests

---

## 🤝 Contributing

Pull requests are welcome.  
Please follow the existing code style and include relevant documentation.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
```

If you want, I can also tailor this README so it **auto‑generates badges** (build status, license, dependencies) and includes **live screenshots** of the dashboard to make it pop even more visually. Would you like me to add that layer of polish next?