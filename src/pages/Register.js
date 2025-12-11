import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input 
            type="text" 
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="register-input"
          />
          <input type="email" placeholder="Email" className="register-input" />
          <input type="password" placeholder="Password" className="register-input" />
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
