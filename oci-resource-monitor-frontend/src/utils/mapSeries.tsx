// src/utils/mapSeries.ts
import type { MetricSeries } from '../api';

export function mapSeriesToChartData(series?: MetricSeries) {
  if (!series?.points?.length) return [];
  return series.points.map((p) => ({
    t: new Date(p.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    v: p.v,
  }));
}
