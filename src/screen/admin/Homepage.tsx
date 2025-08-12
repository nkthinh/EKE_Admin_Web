import React from "react";

const StatCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="card p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

const Homepage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500">Overview of system metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="1,245" />
        <StatCard label="Active Packages" value="12" />
        <StatCard label="Transactions (30d)" value="3,482" />
        <StatCard label="Topups (30d)" value="$12,940" />
      </div>

      <div className="card p-6">
        <h3 className="text-base font-semibold text-gray-900">
          Recent Activity
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Connect your API to populate real data.
        </p>
        <div className="mt-4 h-40 rounded-md bg-gradient-to-r from-primary-50 to-white" />
      </div>
    </div>
  );
};

export default Homepage;
