import React, { useEffect, useState } from "react";

export default function ManageBuses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    setBuses(JSON.parse(localStorage.getItem("buses")) || []);
  }, []);

  const deleteBus = (id) => {
    const updated = buses.filter((b) => b.id !== id);
    setBuses(updated);
    localStorage.setItem("buses", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Manage Buses</h2>

      {buses.map((bus) => (
        <div key={bus.id}>
          <span>{bus.name} ({bus.from} → {bus.to})</span>
          <button onClick={() => deleteBus(bus.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
