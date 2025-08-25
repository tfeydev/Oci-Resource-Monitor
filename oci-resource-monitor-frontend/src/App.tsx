import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/layout/Header';
import Dashboard from './pages/dashboard/Dashboard';
import BucketsPage from './pages/storage/Buckets';
import ObjectsPage from './pages/storage/Objects'; // <--- Import here
import ComputePage from './pages/Compute/Compute';
import NetworkingPage from './pages/Networking/Networking';
import IdentityPage from './pages/Identity/Identity';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compute" element={<ComputePage />} />
          <Route path="/networking" element={<NetworkingPage />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/storage/buckets" element={<BucketsPage />} />
          <Route path="/storage/buckets/:bucketName" element={<ObjectsPage />} /> {/* <--- Route here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}