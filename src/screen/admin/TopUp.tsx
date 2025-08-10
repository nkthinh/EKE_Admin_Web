import React from "react";

const TopUp: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Top Up</h2>
        <p className="text-sm text-gray-500">Admin adds balance to a user</p>
      </div>

      <form className="card grid gap-4 p-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            User ID or Email
          </label>
          <input className="input" placeholder="user@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input className="input" type="number" placeholder="100" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            className="input"
            rows={3}
            placeholder="Reason for top-up"
          />
        </div>
        <div className="md:col-span-2">
          <button type="button" className="btn btn-primary">
            Confirm Top Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopUp;
