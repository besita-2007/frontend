import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SeatSelection.css";

function SeatSelection() {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const from = localStorage.getItem("searchFrom") || "Unknown";
  const to = localStorage.getItem("searchTo") || "Unknown";
  const date = localStorage.getItem("searchDate") || "Unknown";

  useEffect(() => {
    fetch("/bus-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bus data");
        return res.json();
      })
      .then((data) => {
        const found = data.buses.find((b) => b.id === parseInt(busId));
        setBus(found || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [busId]);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, textAlign: "center" }}>Error: {error}</div>;
  if (!bus) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>No bus selected</h3>
        <p>Please go back and choose a bus before selecting seats.</p>
      </div>
    );
  }

  const seats = Array.from({ length: bus.seats }, (_, i) => i + 1); // Use real seat count

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const continueBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    const bookingId = Date.now().toString();
    localStorage.setItem(`booking-${bookingId}`,
      JSON.stringify({
        bus,
        from,
        to,
        date,
        selectedSeats,
        totalPrice: selectedSeats.length * (bus.price || 500), // fallback price
      })
    );
    navigate(`/passenger/${bookingId}`);
  };

  return (
    <div className="seat-container">
      <h2>Select Seats</h2>
      <p>
        <strong>{bus.number || bus.name}</strong> - {bus.route || bus.type}
      </p>
      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat}
            className={selectedSeats.includes(seat) ? "seat selected" : "seat"}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <p>Total Price: ₹{selectedSeats.length * (bus.price || 500)}</p>
        <button className="next-btn" onClick={continueBooking}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
