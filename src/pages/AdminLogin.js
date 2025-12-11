import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // Replace this with real auth (API call)
    if (adminId === "admin" && password === "admin123") {
      // Save something to indicate admin is logged in (localStorage, context, or global store)
      localStorage.setItem("isAdmin", "true");
      // Redirect to protected admin dashboard
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="adminlogin-container">
      <div className="adminlogin-card">
        <h2>Admin Login</h2>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="adminlogin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="adminlogin-input"
          />
          <button type="submit" className="adminlogin-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;