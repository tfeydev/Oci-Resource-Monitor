import React from 'react';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Compute', href: '/compute' },
    { label: 'Networking', href: '/networking' },
    { label: 'Object Storage', href: '/object-storage' },
    { label: 'Identity', href: '/identity' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header section with navigation */}
      <header className="bg-white shadow-md p-4">
        {/* <nav className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          {menuItems.map(item =>
            location.pathname !== item.href ? (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                {item.label}
              </a>
            ) : null
          )}
        </nav> */}
      </header>

      {/* Main content area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer section */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 OCI Monitor
      </footer>
    </div>
  );
};

export default AppLayout;
