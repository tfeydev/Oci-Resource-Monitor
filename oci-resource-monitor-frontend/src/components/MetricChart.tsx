// src/components/MetricChart.tsx
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MetricSeries } from '../api';
import { mapSeriesToChartData } from '../utils/mapSeries';

// Hilfsfunktion für den letzten Wert
function getLatestValue(series?: MetricSeries): number | null {
  if (!series?.points?.length) return null;
  return series.points[series.points.length - 1].v ?? null;
}

type MetricChartProps = {
  title: string;
  color: string;
  fill?: string;
  type: 'area' | 'line';
  unit?: string;
  series: MetricSeries[];
};

export default function MetricChart({
  title,
  color,
  fill,
  type,
  unit = '%',
  series,
}: MetricChartProps) {
  const data = mapSeriesToChartData(series[0]);
  const latest = getLatestValue(series[0]);

  if (!data.length) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <div className="font-semibold mb-2">{title}</div>
        <p className="text-gray-500">Keine Daten verfügbar</p>
      </div>
    );
  }

  const tooltipFormatter = (value: number) => `${value.toFixed(1)} ${unit}`;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-baseline justify-between mb-2">
        <div className="font-semibold">{title}</div>
        {latest !== null && (
          <div className="text-lg font-bold text-gray-800">
            {latest.toFixed(1)} {unit}
          </div>
        )}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Area type="monotone" dataKey="v" stroke={color} fill={fill || color} />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Line type="monotone" dataKey="v" stroke={color} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
