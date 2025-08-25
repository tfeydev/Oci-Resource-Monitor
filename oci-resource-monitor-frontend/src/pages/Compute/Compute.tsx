import AppLayout from "../../components/layout/AppLayout";

export default function ComputePage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Compute</h1>
        <p>Here you can monitor and manage your OCI Compute instances.</p>
      </div>
    </AppLayout>
  );
}