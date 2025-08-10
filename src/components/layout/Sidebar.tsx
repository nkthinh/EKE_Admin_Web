import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wallet,
  Users,
  Home,
  Package,
  ArrowDownToLine,
  Leaf,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/users", label: "Users", icon: Users },
  { to: "/transactions", label: "Transactions", icon: Wallet },
  { to: "/topup", label: "Top Up", icon: ArrowDownToLine },
  { to: "/packages", label: "Packages", icon: Package },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-100 bg-white">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white">
          <Leaf className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold text-gray-900">Admin</span>
      </div>
      <nav className="mt-4 px-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
