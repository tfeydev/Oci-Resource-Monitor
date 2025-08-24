/** Base URL for backend */
const API_BASE = 'http://localhost:8080/api';

/** Resource with current CPU/RAM usage values */
export interface Resource {
  id: string;
  name: string;
  status: string;
  cpu_usage: number;
  memory_usage: number;
  ts: string; // ISO-8601
}

/** Compact resource view (without metrics) */
export interface ResourceView {
  id: string;
  name: string;
  status: string;
}

/** Single data point in a time series */
export interface MetricPoint {
  t: number; // Unix ms
  v: number;
}

/** Time series (e.g., CPU or Memory) */
export interface MetricSeries {
  label: string;
  points: MetricPoint[];
  resourceId?: string; // optional, if provided by backend
}

// ---- Fetch functions ----
async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export const fetchResources = () => fetchJson<ResourceView[]>('/resources');
export const fetchCpuMetrics = () => fetchJson<MetricSeries[]>('/metrics/cpu');
export const fetchMemoryMetrics = () => fetchJson<MetricSeries[]>('/metrics/memory');
export const fetchVcns = () => fetchJson<any[]>('/networking/vcns');
export const fetchPolicies = () => fetchJson<any[]>('/identity/policies');

// Placeholders for not-yet-implemented endpoints
export async function fetchCompartments(): Promise<any[]> {
  console.warn('[Stub] /api/compartments not implemented in backend');
  return [];
}

export async function fetchDomains(): Promise<any[]> {
  console.warn('[Stub] /api/domains not implemented in backend');
  return [];
}

/*
// Example for when these endpoints are implemented:

export async function fetchCompartments(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/compartments`);
  if (!res.ok) throw new Error('Failed to fetch compartments');
  return res.json();
}

export async function fetchDomains(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/domains`);
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}
*/
