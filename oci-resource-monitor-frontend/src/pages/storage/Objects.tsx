import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import AppLayout from "../../components/layout/AppLayout";

const ObjectsPage: React.FC = () => {
  const { bucketName } = useParams<{ bucketName: string }>();
  const [objectNames, setObjectNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPrefix, setCurrentPrefix] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!bucketName) {
      setError("Bucket name is missing.");
      setLoading(false);
      return;
    }

    async function fetchObjects() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/storage/buckets/${bucketName}/objects`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch objects");
        }
        const data: string[] = await res.json();
        setObjectNames(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchObjects();
  }, [bucketName]);

  const handleDrillDown = (name: string) => {
    setCurrentPrefix(name);
    setSelectedItem(null); // Clear selection when drilling down
  };

  const handleSelectObject = (name: string) => {
    setSelectedItem(name);
  };

  // Logic to process items on the current level
  const filteredObjects = objectNames.filter((name) =>
    name.startsWith(currentPrefix)
  );
  const currentLevelItems: { name: string; isFolder: boolean }[] = [];
  const uniqueItems = new Set<string>();

  filteredObjects.forEach((name) => {
    const relativeName = name.substring(currentPrefix.length);
    if (relativeName.includes("/")) {
      const folderName = relativeName.split("/")[0] + "/";
      if (!uniqueItems.has(folderName)) {
        uniqueItems.add(folderName);
        currentLevelItems.push({ name: folderName, isFolder: true });
      }
    } else {
      if (relativeName.length > 0 && !uniqueItems.has(relativeName)) {
        uniqueItems.add(relativeName);
        currentLevelItems.push({ name: relativeName, isFolder: false });
      }
    }
  });

  const goBack = () => {
    if (currentPrefix === "") {
      navigate("/storage/buckets");
    } else {
      const segments = currentPrefix.split("/").filter(Boolean);
      segments.pop();
      const newPrefix = segments.length > 0 ? segments.join("/") + "/" : "";
      setCurrentPrefix(newPrefix);
    }
  };

  // Breadcrumbs logic
  const breadcrumbs = [
    { name: bucketName, path: "" },
    ...currentPrefix
      .split("/")
      .filter(Boolean)
      .map((segment, index, arr) => ({
        name: segment + "/",
        path: arr.slice(0, index + 1).join("/") + "/",
      })),
  ];

  if (loading) {
    <AppLayout>
    return (
      <main className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col items-center gap-2">
          <Spinner />
          <p className="text-gray-600">{bucketName}</p>
        </div>
      </main>
    );
    </AppLayout>
  }

  if (error) {
    <AppLayout>
    return (
      <main className="max-w-7xl mx-auto px-8 py-6">
        <p className="text-red-500">Error: {error}</p>
      </main>
    );
    </AppLayout>
  }

  if (error) {
    return (
      <AppLayout>
        <main className="max-w-7xl mx-auto px-8 py-6">
          <p className="text-red-500">Error: {error}</p>
        </main>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
    <main className="max-w-7xl mx-auto px-8 py-6">
      <h2 className="text-2xl font-semibold mb-4">
        Objects in Bucket: {bucketName}
      </h2>

      {/* Back button and Breadcrumbs */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={goBack} className="text-blue-600 hover:underline">
          &larr; Back
        </button>
        <span className="text-gray-400">|</span>
        <nav aria-label="Breadcrumb">
          <ol className="flex text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <button
                  onClick={() => setCurrentPrefix(crumb.path)}
                  className={`hover:underline transition-colors duration-200 ${
                    index === breadcrumbs.length - 1
                      ? "text-gray-800 font-medium"
                      : "text-blue-600"
                  }`}
                >
                  {crumb.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Two-column layout for file list and selected item details */}
      <div className="flex gap-8">
        {/* Left column: Object list */}
        <div className="flex-1 overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Object Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLevelItems.map((item) => (
                <tr
                  key={item.name}
                  onClick={() =>
                    item.isFolder
                      ? handleDrillDown(currentPrefix + item.name)
                      : handleSelectObject(currentPrefix + item.name)
                  }
                  className={`cursor-pointer transition-colors duration-150 ${
                    selectedItem === currentPrefix + item.name
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={
                        item.isFolder ? "text-blue-600" : "text-gray-900"
                      }
                    >
                      {item.name}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column: Selected object details */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Selected Object</h3>
          {selectedItem ? (
            <div className="space-y-2">
              <p className="text-gray-700">Name: **{selectedItem}**</p>
              {/* Hier könnten weitere Details von einem anderen API-Aufruf angezeigt werden */}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              <p>Select a file to view details.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  </AppLayout>
  );
};

export default ObjectsPage;
