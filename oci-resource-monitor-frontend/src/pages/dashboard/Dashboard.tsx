// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from 'react';
import {
  fetchResources,
  fetchCpuMetrics,
  fetchMemoryMetrics,
  fetchVcns,
  fetchPolicies,
  fetchCompartments,
  fetchDomains,
} from '../../api';
import type { ResourceView, MetricSeries, Resource } from '../../api';

import AppLayout from '../../components/layout/AppLayout';
import ResourceTable from './components/ResourceTable';
import MetricChart from '../../components/MetricChart';
import ServicesSection from './components/ServicesSection';

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

  // ---------- SAFE LATEST VALUE ----------
  const getLatestValue = (series: MetricSeries[]): number | null => {
    if (series.length > 0 && series[0].points.length > 0) {
      return series[0].points.at(-1)?.v ?? null;
    }
    return null;
  };

  const latestCpuValue = getLatestValue(cpuMetrics);
  const latestMemoryValue = getLatestValue(memoryMetrics);

  // ---------- FETCH ALL ----------
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        resourcesData,
        cpuData,
        memoryData,
        vcnsData,
        policiesData,
        compartmentsData,
        domainsData,
      ] = await Promise.all([
        fetchResources(),
        fetchCpuMetrics(),
        fetchMemoryMetrics(),
        fetchVcns(),
        fetchPolicies(),
        fetchCompartments(),
        fetchDomains(),
      ]);

      setResources(resourcesData);
      setCpuMetrics(cpuData);
      setMemoryMetrics(memoryData);
      setVcns(vcnsData);
      setPolicies(policiesData);
      setCompartments(compartmentsData);
      setDomains(domainsData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data. Please check the API endpoints.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 610000); 
    return () => clearInterval(intervalId);
  }, []);

  // ---------- RENDER ----------
  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 text-center">Loading dashboard data...</div>
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

  const mappedResources: Resource[] = resources.map((r) => ({
    ...r,
    cpu_usage: (r as any).cpu_usage ?? 0,
    memory_usage: (r as any).memory_usage ?? 0,
    ts: (r as any).ts ?? new Date().toISOString(),
  }));

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">OCI Resource Monitor Dashboard</h1>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MetricChart
            title={`CPU (mean, 1m) – ${
              latestCpuValue !== null ? latestCpuValue.toFixed(2) : 'N/A'
            }%`}
            color="#2563eb"
            type="line"
            unit="%"
            series={cpuMetrics}
          />
          <MetricChart
            title={`Memory (mean, 1m) – ${
              latestMemoryValue !== null ? latestMemoryValue.toFixed(2) : 'N/A'
            }%`}
            color="#059669"
            fill="#A7F3D0"
            type="area"
            unit="%"
            series={memoryMetrics}
          />
        </div>

        {/* RESOURCES */}
        <ResourceTable resources={mappedResources} />

        {/* SERVICES */}
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
