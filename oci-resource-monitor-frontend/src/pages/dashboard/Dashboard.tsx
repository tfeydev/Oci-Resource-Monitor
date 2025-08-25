import { useEffect, useState } from "react";
import {
  fetchResources,
  fetchCpuMetrics,
  fetchMemoryMetrics,
  fetchVcns,
  fetchPolicies,
  fetchCompartments,
  fetchDomains,
} from "../../api";
import type { ResourceView, MetricSeries, Resource } from "../../api";

import AppLayout from "../../components/layout/AppLayout";
import ResourceTable from "./components/ResourceTable";
import MetricChart from "../../components/shared/charts/MetricChart";
import ServicesSection from "./components/ServicesSection";
import Spinner from "../../components/shared/Spinner";

export default function Dashboard() {
  const [resources, setResources] = useState<ResourceView[]>([]);
  const [cpuMetrics, setCpuMetrics] = useState<MetricSeries[]>([]);
  const [memoryMetrics, setMemoryMetrics] = useState<MetricSeries[]>([]);
  const [vcns, setVcns] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [compartments, setCompartments] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------- UTILS ----------
  const getLatestValue = (series: MetricSeries[]): number | null => {
    if (series.length > 0 && series[0].points.length > 0) {
      return series[0].points.at(-1)?.v ?? null;
    }
    return null;
  };

  const latestCpuValue = getLatestValue(cpuMetrics);
  const latestMemoryValue = getLatestValue(memoryMetrics);

  // ---------- LOAD STATIC DATA ----------
  const loadStaticData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        resourcesData,
        vcnsData,
        policiesData,
        compartmentsData,
        domainsData,
      ] = await Promise.all([
        fetchResources(),
        fetchVcns(),
        fetchPolicies(),
        fetchCompartments(),
        fetchDomains(),
      ]);

      setResources(resourcesData);
      setVcns(vcnsData);
      setPolicies(policiesData);
      setCompartments(compartmentsData);
      setDomains(domainsData);
    } catch (err) {
      console.error("Failed to load static data:", err);
      setError("Failed to load dashboard static data.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- LOAD METRICS ONLY ----------
  const loadMetrics = async () => {
    try {
      const [cpuData, memoryData] = await Promise.all([
        fetchCpuMetrics(),
        fetchMemoryMetrics(),
      ]);
      setCpuMetrics(cpuData);
      setMemoryMetrics(memoryData);
    } catch (err) {
      console.error("Failed to load metrics:", err);
    }
  };

  useEffect(() => {
    // initial load
    loadStaticData();
    loadMetrics();
    const id = setInterval(loadMetrics, 60000); // refresh metrics every 60s
    return () => clearInterval(id);
  }, []);

  // ---------- MERGE METRICS INTO RESOURCES ----------
  const mappedResources: Resource[] = resources.map((r) => ({
    ...r,
    cpu_usage: latestCpuValue ?? 0,
    memory_usage: latestMemoryValue ?? 0,
    ts: new Date().toISOString(),
  }));

  const targetVm = mappedResources.find(
    (r) => r.name === "springboot-ubuntu-vm"
  );
  const otherResources = mappedResources.filter(
    (r) => r.name !== "springboot-ubuntu-vm"
  );

  const statusColors: Record<string, string> = {
    RUNNING: "bg-green-100 text-green-800",
    STOPPED: "bg-gray-100 text-gray-800",
    TERMINATED: "bg-red-100 text-red-800",
    UNKNOWN: "bg-yellow-100 text-yellow-800",
  };

  const usageColor = (value: number, warn: number, crit: number) => {
    if (value >= crit) return "text-red-600";
    if (value >= warn) return "text-yellow-600";
    return "text-green-700";
  };

  // ---------- RENDER ----------
  if (loading) {
    return (
      <AppLayout>
        <Spinner />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6 text-red-500">Error: {error}</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-indigo-600">
            OCI Resource Monitor Dashboard
          </span>
          <button
            onClick={() => {
              loadStaticData();
              loadMetrics();
            }}
            className="ml-3 relative -top-1.5 px-2.5 py-1 
               rounded text-xs font-medium 
               bg-blue-300 hover:bg-blue-400 
               text-blue-900 shadow-sm 
               transition-colors duration-200"
          >
            Reload
          </button>
        </h1>

        {/* Highlight card for springboot-ubuntu-vm */}
        {targetVm && (
          <div className="mb-8 p-4 border rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{targetVm.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  statusColors[targetVm.status] || "bg-gray-200"
                }`}
              >
                {targetVm.status}
              </span>
            </div>
            <div className="flex gap-8 mb-6">
              <div
                className={`font-medium ${usageColor(
                  targetVm.cpu_usage,
                  70,
                  90
                )}`}
              >
                CPU: {targetVm.cpu_usage.toFixed(2)}%
              </div>
              <div
                className={`font-medium ${usageColor(
                  targetVm.memory_usage,
                  75,
                  90
                )}`}
              >
                Memory: {targetVm.memory_usage.toFixed(2)}%
              </div>
            </div>
            {/* Charts inside the card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricChart
                title={`CPU (mean, 1m) – ${
                  latestCpuValue !== null ? latestCpuValue.toFixed(2) : "N/A"
                }%`}
                color="#2563eb"
                type="line"
                unit="%"
                series={cpuMetrics}
              />
              <MetricChart
                title={`Memory (mean, 1m) – ${
                  latestMemoryValue !== null
                    ? latestMemoryValue.toFixed(2)
                    : "N/A"
                }%`}
                color="#059669"
                fill="#A7F3D0"
                type="area"
                unit="%"
                series={memoryMetrics}
              />
            </div>
          </div>
        )}

        {/* Remaining resources */}
        <ResourceTable resources={otherResources} />

        {/* Services */}
        <ServicesSection
          vcns={vcns}
          policies={policies}
          compartments={compartments}
          domains={domains}
        />
      </div>
    </AppLayout>
  );
}
