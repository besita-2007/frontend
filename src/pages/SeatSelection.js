import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SeatSelection.css";

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, from, to, date } = location.state || {};

  const seats = Array.from({ length: 32 }, (_, i) => i + 1); // 32 seats

  const [selectedSeats, setSelectedSeats] = useState([]);

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

    navigate("/passenger", {
      state: {
        bus,
        from,
        to,
        date,
        selectedSeats,
        totalPrice: selectedSeats.length * bus.price,
      },
    });
  };

  return (
    <div className="seat-container">
      <h2>Select Seats</h2>

      <p>
        <strong>{bus.name}</strong> - {bus.type}
      </p>

      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat}
            className={
              selectedSeats.includes(seat)
                ? "seat selected"
                : "seat"
            }
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <p>Total Price: ₹{selectedSeats.length * bus.price}</p>

        <button className="next-btn" onClick={continueBooking}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
