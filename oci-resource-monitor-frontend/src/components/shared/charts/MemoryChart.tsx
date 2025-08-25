// src/components/MemoryChart.tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { MetricSeries } from '../../../api';

export default function MemoryChart({series}:{series:MetricSeries[]}) {
  const data = (series[0]?.points ?? []).map(p => ({ t: new Date(p.t).toLocaleTimeString(), v: p.v }));
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="font-semibold mb-2">Memory (mean, 1m)</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}><XAxis dataKey="t"/><YAxis/><Tooltip/><Area type="monotone" dataKey="v" stroke="#059669" fill="#A7F3D0"/></AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
