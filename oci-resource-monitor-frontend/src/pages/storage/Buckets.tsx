// pages/storage/buckets/BucketsPage.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import AppLayout from "../../components/layout/AppLayout";

// Die Bucket-Liste ist jetzt nur ein Array von Strings
const BucketsPage: React.FC = () => {
  const [bucketNames, setBucketNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBuckets() {
      try {
        const res = await fetch("http://localhost:8080/api/storage/buckets");
        if (!res.ok) {
          throw new Error("Failed to fetch buckets");
        }
        const data: string[] = await res.json();
        setBucketNames(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBuckets();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <Spinner />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-8 py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-2xl font-semibold mb-4">Object Storage Buckets</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bucket Name
                </th>
                {/* Diese Spalten entfernen, da keine Daten vorhanden */}
                {/*
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bucketNames.map((bucketName, index) => (
                <tr
                  key={bucketName}
                  className="hover:bg-gray-100 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link to={`/storage/buckets/${bucketName}`}>
                      {bucketName}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default BucketsPage;
