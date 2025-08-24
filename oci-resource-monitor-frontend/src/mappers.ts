// src/mappers.ts
import type { Resource, MetricSeries } from './api';

export const mergeMetricsIntoResources = (
  resources: Omit<Resource, 'cpu_usage' | 'memory_usage'>[],
  cpu: MetricSeries[],
  mem: MetricSeries[]
): Resource[] =>
  resources.map(r => {
    const cpuSeries = cpu.find(c => c.label === r.id);
    const memSeries = mem.find(m => m.label === r.id);

    return {
      ...r,
      cpu_usage: cpuSeries?.points.at(-1)?.v ?? 0,
      memory_usage: memSeries?.points.at(-1)?.v ?? 0
    };
  });
