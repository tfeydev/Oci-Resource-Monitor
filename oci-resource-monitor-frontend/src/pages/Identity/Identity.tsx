import AppLayout from "../../components/layout/AppLayout";

export default function IdentityPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Identity</h1>
        <p>IAM policies, users, and group management.</p>
      </div>
    </AppLayout>
  );
}