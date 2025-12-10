import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🚌 Bus Reservation System</h1>

      <Link to="/login">
        <button>User Login</button>
      </Link>

      <br /><br />

      <Link to="/admin">
        <button>Admin Login</button>
      </Link>

      <br /><br />

      <Link to="/register">
        <button>Register</button>
      </Link>

      <br /><br />

      <Link to="/search">
        <button>Search Bus</button>
      </Link>
    </div>
  );
}

export default Home;
