import { useState } from "react";
import "./SearchBus.css";
import { useNavigate } from "react-router-dom";

function SearchBus() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const searchBuses = (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }

    // Navigate to Bus List page
    navigate("/bus-list", {
      state: { from, to, date },
    });
  };

  return (
    <div className="search-container">
      <h2>Search Buses</h2>

      <form className="search-form" onSubmit={searchBuses}>
        <label>From</label>
        <input
          type="text"
          placeholder="Enter starting point"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <label>To</label>
        <input
          type="text"
          placeholder="Enter destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <label>Date of Journey</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBus;
