// components/ResourceTable.tsx
import type { Resource } from '../../../api';

interface ResourceTableProps {
  resources: Resource[];
}

export default function ResourceTable({ resources }: ResourceTableProps) {
  if (resources.length === 1) {
    const vm = resources[0];
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4">{vm.name}</h2>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Status</dt>
            <dd className="text-gray-900">{vm.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">CPU (%)</dt>
            <dd className="text-gray-900">{vm.cpu_usage}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-gray-600">Memory (%)</dt>
            <dd className="text-gray-900">{vm.memory_usage}</dd>
          </div>
        </dl>
      </div>
    );
  }

  // Fallback: normale Tabelle für mehrere VMs
  return (
    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">CPU (%)</th>
          <th className="px-4 py-2">Memory (%)</th>
        </tr>
      </thead>
      <tbody>
        {resources.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="px-4 py-2">{r.name}</td>
            <td className="px-4 py-2">{r.status}</td>
            <td className="px-4 py-2">{r.cpu_usage}</td>
            <td className="px-4 py-2">{r.memory_usage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
