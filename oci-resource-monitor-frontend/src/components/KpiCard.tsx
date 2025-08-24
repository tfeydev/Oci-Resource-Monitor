// src/components/KpiCard.tsx
export default function KpiCard({title, value, trend}:{title:string; value:string; trend:'up'|'down'|'stable'}) {
  const color = trend==='up'?'text-emerald-600':trend==='down'?'text-rose-600':'text-slate-600';
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-sm text-slate-500">{title}</div>
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
