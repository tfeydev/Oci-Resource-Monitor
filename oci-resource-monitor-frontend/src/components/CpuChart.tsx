// src/components/CpuChart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MetricSeries } from '../api';

export default function CpuChart({series}:{series:MetricSeries[]}) {
  const data = (series[0]?.points ?? []).map(p => ({ t: new Date(p.t).toLocaleTimeString(), v: p.v }));
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="font-semibold mb-2">CPU (mean, 1m)</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}><XAxis dataKey="t"/><YAxis/><Tooltip/><Line type="monotone" dataKey="v" stroke="#2563eb"/></LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
