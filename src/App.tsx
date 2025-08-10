import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Homepage from "./screen/admin/Homepage";
import Users from "./screen/admin/Users";
import Transactions from "./screen/admin/Transactions";
import TopUp from "./screen/admin/TopUp";
import Packages from "./screen/admin/Packages";
import Login from "./screen/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <AppLayout>
                <Homepage />
              </AppLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AppLayout>
                <Users />
              </AppLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <AppLayout>
                <Transactions />
              </AppLayout>
            }
          />
          <Route
            path="/topup"
            element={
              <AppLayout>
                <TopUp />
              </AppLayout>
            }
          />
          <Route
            path="/packages"
            element={
              <AppLayout>
                <Packages />
              </AppLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
