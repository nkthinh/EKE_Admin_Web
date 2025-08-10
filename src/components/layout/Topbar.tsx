import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

const Topbar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 -mb-px h-16 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-base font-semibold text-gray-900">Admin</h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 md:block">
            Hello, Admin
          </span>
          <button className="btn btn-ghost gap-2" onClick={logout}>
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-200" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
