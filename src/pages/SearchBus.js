import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBus.css";

function SearchBus() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      alert("Please fill From, To and Date");
      return;
    }
    localStorage.setItem("searchFrom", from);
    localStorage.setItem("searchTo", to);
    localStorage.setItem("searchDate", date);
    navigate("/buses");
  };

  return (
    <div className="searchbus-container">
      <div className="searchbus-card">
        <h2>Search Bus</h2>
        <form onSubmit={submit}>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            type="text"
            placeholder="From"
            className="searchbus-input"
          />

          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="text"
            placeholder="To"
            className="searchbus-input"
          />

          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="searchbus-input"
          />

          <button type="submit" className="searchbus-btn">
            Search Buses
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBus;
