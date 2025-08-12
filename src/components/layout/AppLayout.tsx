import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-col">
        <Topbar />
        <main className="container mx-auto w-full max-w-7xl flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
