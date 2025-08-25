// src/components/ServicesPanel.tsx
export default function ServicesPanel() {
  const pinned = [
    { name: 'Instances', cat: 'Compute' },
    { name: 'Virtual cloud networks', cat: 'Networking' },
  ];
  const recent = [
    { name: 'Policies', cat: 'Identity' },
    { name: 'Compartments', cat: 'Identity' },
    { name: 'Domains', cat: 'Identity' },
    { name: 'Identity', cat: 'Identity & Security' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Pinned</h3>
        <ul className="space-y-2">{pinned.map(p=>(
          <li key={p.name} className="flex justify-between">
            <span>{p.name}</span><span className="text-slate-500">{p.cat}</span>
          </li>))}</ul>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Recently visited</h3>
        <ul className="space-y-2">{recent.map(p=>(
          <li key={p.name} className="flex justify-between">
            <span>{p.name}</span><span className="text-slate-500">{p.cat}</span>
          </li>))}</ul>
      </div>
    </div>
  );
}
