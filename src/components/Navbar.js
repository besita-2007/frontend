import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Bus Booking</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
