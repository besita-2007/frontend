import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBus() {
  const [bus, setBus] = useState({
    name: "",
    from: "",
    to: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const buses = JSON.parse(localStorage.getItem("buses")) || [];
    buses.push({ ...bus, id: Date.now() });
    localStorage.setItem("buses", JSON.stringify(buses));
    alert("Bus added successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Add Bus</h2>
      <input name="name" placeholder="Bus Name" onChange={handleChange} />
      <input name="from" placeholder="From" onChange={handleChange} />
      <input name="to" placeholder="To" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
