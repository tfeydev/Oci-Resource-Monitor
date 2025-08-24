import type { Resource } from '../../../api';

interface Props {
  resources: Resource[];
}

export default function ResourceTable({ resources }: Props) {
  // Wenn keine Ressourcen, gib gar nichts aus
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">CPU (%)</th>
            <th className="px-4 py-2 border-b">Memory (%)</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res.id}>
              <td className="px-4 py-2 border-b">{res.name}</td>
              <td className="px-4 py-2 border-b">{res.status}</td>
              <td className="px-4 py-2 border-b">{res.cpu_usage.toFixed(2)}</td>
              <td className="px-4 py-2 border-b">{res.memory_usage.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
