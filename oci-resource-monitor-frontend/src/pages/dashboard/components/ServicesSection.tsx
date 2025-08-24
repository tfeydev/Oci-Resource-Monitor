import React from 'react';

interface ServicesSectionProps {
  vcns: any[];
  policies: any[];
  compartments: any[];
  domains: any[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ vcns, policies, compartments, domains }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Other Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">VCNs</h3>
          {vcns.length > 0 ? (
            <ul>
              {vcns.map((v, index) => <li key={v.id || index}>{v.displayName}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500">No VCNs found.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Policies</h3>
          {policies.length > 0 ? (
            <ul>
              {policies.map((p, index) => <li key={p.id || index}>{p.name}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500">No policies found.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Compartments</h3>
          {compartments.length > 0 ? (
            <ul>
              {compartments.map((c, index) => <li key={c.id || index}>{c.name}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500">No compartments found.</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-lg font-semibold mb-2">Domains</h3>
          {domains.length > 0 ? (
            <ul>
              {domains.map((d, index) => <li key={d.id || index}>{d.name}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500">No domains found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;