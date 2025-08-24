// Header.tsx
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight mb-4">
          OCI Resource Monitor
        </h1>
        <nav className="flex gap-10 text-indigo-600 font-semibold">
          <Link to="/dashboard" className="transition-all duration-300 transform hover:scale-105 hover:text-indigo-800">
            Dashboard
          </Link>
          <Link to="/compute" className="transition-all duration-300 transform hover:scale-105 hover:text-indigo-800">
            Compute
          </Link>
          <Link to="/networking" className="transition-all duration-300 transform hover:scale-105 hover:text-indigo-800">
            Networking
          </Link>
          <Link to="/storage/buckets" className="transition-all duration-300 transform hover:scale-105 hover:text-indigo-800">
            Object Storage
          </Link>
          <Link to="/identity" className="transition-all duration-300 transform hover:scale-105 hover:text-indigo-800">
            Identity
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;