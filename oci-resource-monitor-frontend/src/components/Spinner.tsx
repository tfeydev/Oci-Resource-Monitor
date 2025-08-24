// src/components/common/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  label?: string;
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ label = 'Loading…', size = 40 }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        style={{
          width: size,
          height: size,
        }}
        role="status"
        aria-label={label}
      />
      {label && <p className="mt-2 text-sm text-gray-600">{label}</p>}
    </div>
  );
};

export default Spinner;
