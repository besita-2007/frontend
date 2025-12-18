import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PassengerDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(`booking-${bookingId}`));

    if (!data) {
      navigate("/searchbus");
      return;
    }

    setBooking(data);

    // ✅ EXACT passenger count = seats selected
    setPassengers(
      data.selectedSeats.map(seat => ({
        seatNumber: seat,
        name: "",
        age: "",
        gender: "",
      }))
    );
  }, [bookingId, navigate]);

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const submitDetails = () => {
    localStorage.setItem(
      `passengers-${bookingId}`,
      JSON.stringify(passengers)
    );
    alert("Booking successful!");
    navigate("/");
  };

  if (!booking) return null;

  return (
    <div>
      <h2>Passenger Details</h2>

      {passengers.map((p, i) => (
        <div key={p.seatNumber} className="passenger-card">
          <h4>Seat {p.seatNumber}</h4>

          <input
            placeholder="Name"
            value={p.name}
            onChange={e => handleChange(i, "name", e.target.value)}
          />

          <input
            placeholder="Age"
            value={p.age}
            onChange={e => handleChange(i, "age", e.target.value)}
          />

          <select
            value={p.gender}
            onChange={e => handleChange(i, "gender", e.target.value)}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      ))}

      <button onClick={submitDetails}>Confirm Booking</button>
    </div>
  );
}

export default PassengerDetails;
