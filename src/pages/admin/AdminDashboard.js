import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button onClick={() => navigate("/admin/add-bus")}>
        Add New Bus
      </button>

      <button onClick={() => navigate("/admin/manage-buses")}>
        Manage Buses
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/admin/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
