import React from 'react';
import type { MetricSeries } from '../../../api';

interface MetricsSectionProps {
  cpuMetrics: MetricSeries[];
  memoryMetrics: MetricSeries[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ cpuMetrics, memoryMetrics }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Metrics</h2>
      <div className="flex space-x-4">
        {/* CPU Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">CPU Usage</h3>
          {cpuMetrics.length > 0 ? (
            <p>Chart for CPU data goes here...</p>
          ) : (
            <p className="text-gray-500">No CPU data available.</p>
          )}
        </div>

        {/* Memory Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Memory Usage</h3>
          {memoryMetrics.length > 0 ? (
            <p>Chart for Memory data goes here...</p>
          ) : (
            <p className="text-gray-500">No memory data available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;