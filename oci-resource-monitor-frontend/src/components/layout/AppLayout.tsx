import React from 'react';

// Defines the props for the AppLayout component, explicitly including 'children'.
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header section with navigation */}
      <header className="bg-white shadow-md p-4">
        <nav className="max-w-7xl mx-auto">
          {/* Dashboard Link */}
          <a href="/dashboard" className="text-lg font-semibold text-blue-600 hover:text-blue-800 mr-4">Dashboard</a>
          {/* Link to "Object Storage" has been removed */}
        </nav>
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