import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./BusList.css";

function BusList() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const from = localStorage.getItem("searchFrom");
  const to = localStorage.getItem("searchTo");
  const date = localStorage.getItem("searchDate");

  useEffect(() => {
    if (!from || !to) return;
    fetch("/bus-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bus data");
        return res.json();
      })
      .then((data) => {
        // Filter buses by route if needed
        let filtered = data.buses;
        if (from && to) {
          filtered = filtered.filter(
            (bus) =>
              bus.route &&
              bus.route.toLowerCase().includes(from.toLowerCase()) &&
              bus.route.toLowerCase().includes(to.toLowerCase())
          );
        }
        setBuses(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [from, to]);

  if (!from || !to) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h3>No route selected</h3>
        <p>Please go to the search page and enter 'From' and 'To' to see available buses.</p>
        <Link to="/search"><button>Search Buses</button></Link>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const goToSeat = (bus) => {
    navigate(`/seats/${bus.id}`);
  };

  return (
    <div className="buslist-container">
      <h2>Buses from {from} to {to}</h2>
      <p>Date: {date}</p>

      {buses.length === 0 ? (
        <div style={{textAlign: "center", color: "#888", marginTop: 40}}>No buses found for this route.</div>
      ) : (
        buses.map((bus) => (
          <div key={bus.id} className="bus-card">
            <h3>{bus.number}</h3>
            <p>{bus.route}</p>
            <p>Seats: {bus.seats} | Available: {bus.availableSeats}</p>
            <button onClick={() => goToSeat(bus)} className="select-btn">
              Select Seats
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BusList;
