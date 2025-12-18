import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <nav className="navbar">
      <h2 className="logo">BusReserve</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/searchbus">Search</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>

        {isAdmin && (
          <li><Link to="/admin/dashboard">Admin</Link></li>
        )}
      </ul>
    </nav>
  );
}
