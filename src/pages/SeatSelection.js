import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SeatSelection.css";

function SeatSelection() {
  // URL param
  const { busId } = useParams();
  const navigate = useNavigate();

  // State
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Search details from localStorage
  const from = localStorage.getItem("searchFrom") || "Unknown";
  const to = localStorage.getItem("searchTo") || "Unknown";
  const date = localStorage.getItem("searchDate") || "Unknown";

  /* =========================
     FETCH BUS DETAILS
  ========================= */
  useEffect(() => {
    fetch(`http://localhost:5000/api/buses/${busId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bus");
        return res.json();
      })
      .then((data) => {
        setBus(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [busId]);

  /* =========================
     SEAT TOGGLE
  ========================= */
  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  /* =========================
     CONTINUE BOOKING
  ========================= */
  const continueBooking = () => {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat");
    return;
  }

  const bookingId = Date.now().toString(); // ✅ consistent ID

  // ✅ SAVE BOOKING FIRST
  localStorage.setItem(
    `booking-${bookingId}`,
    JSON.stringify({
      bus,
      from,
      to,
      date,
      selectedSeats,
      totalPrice: selectedSeats.length * (bus.price || 500),
    })
  );

  // ✅ THEN NAVIGATE
  navigate(`/passenger/${bookingId}`);
};


  /* =========================
     UI STATES
  ========================= */
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bus) return <div>No bus found</div>;

  /* =========================
     UI
  ========================= */
  return (
    <div className="seat-container">
      <h2>Select Seats</h2>
      <p>
        {from} → {to} | {date}
      </p>

      <div className="seats-grid">
        {Array.from({ length: bus.seats }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            className={
              selectedSeats.includes(seat) ? "seat selected" : "seat"
            }
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <button type="Button" className="next-btn" onClick={continueBooking}>
        Continue
      </button>
    </div>
  );
}

export default SeatSelection;
