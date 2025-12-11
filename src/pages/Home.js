import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🚌 Bus Reservation System</h1>
        <p>Book your bus tickets easily and securely. Fast, reliable, and convenient!</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
          <Link to="/login">
            <button className="search-btn">User Login</button>
          </Link>
          <Link to="/admin">
            <button className="search-btn">Admin Login</button>
          </Link>
          <Link to="/register">
            <button className="search-btn">Register</button>
          </Link>
          <Link to="/search">
            <button className="search-btn">Search Bus</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
