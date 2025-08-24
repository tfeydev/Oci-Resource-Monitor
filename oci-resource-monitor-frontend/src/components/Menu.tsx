export default function Menu() {
  return (
    <nav className="w-full max-w-7xl mx-auto px-6 bg-white shadow rounded mb-6 flex gap-6">
      <button className="py-2 text-blue-600 hover:underline">Home</button>
      <button className="py-2 text-blue-600 hover:underline">Tenant</button>
      <button className="py-2 text-blue-600 hover:underline">Users</button>
      <button className="py-2 text-blue-600 hover:underline">ADB</button>
    </nav>
  );
}