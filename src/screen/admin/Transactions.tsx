import React from "react";

const Transactions: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
        <p className="text-sm text-gray-500">View and manage transactions</p>
      </div>

      <div className="card p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <input className="input" placeholder="Search by user or id" />
          <select className="input">
            <option>Status: All</option>
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <input type="date" className="input" />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 text-sm text-gray-500">
          Connect API to load transactions.
        </div>
      </div>
    </div>
  );
};

export default Transactions;
