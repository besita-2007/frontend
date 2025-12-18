import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SeatSelection.css";

function SeatSelection() {
  // ✅ HOOKS ONLY HERE (TOP LEVEL)
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
      .then(res => res.json())
      .then(data => {
        const found = data.buses.find(b => b.id === parseInt(busId));
        setBus(found || null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [busId]);

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  // ✅ NO HOOKS HERE
  const continueBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const bookingId = Date.now().toString();

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

    navigate(`/passenger/${bookingId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bus) return <div>No bus found</div>;

  return (
    <div className="seat-container">
      <h2>Select Seats</h2>

      <div className="seats-grid">
        {Array.from({ length: bus.seats }, (_, i) => i + 1).map(seat => (
          <div
            key={seat}
            className={selectedSeats.includes(seat) ? "seat selected" : "seat"}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <button className="next-btn" onClick={continueBooking}>
        Continue
      </button>
    </div>
  );
}

export default SeatSelection;
