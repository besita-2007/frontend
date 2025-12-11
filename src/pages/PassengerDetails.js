import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PassengerDetails.css";

export default function PassengerDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus, setBus] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch bus data from public folder
    fetch("/bus-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bus data");
        return res.json();
      })
      .then((data) => {
        setBusData(data);
        // Get booking data from localStorage
        const bookingData = JSON.parse(localStorage.getItem(`booking-${bookingId}`) || "{}" );
        setSelectedSeats(bookingData.selectedSeats || []);
        setFrom(bookingData.from || "");
        setTo(bookingData.to || "");
        setDate(bookingData.date || "");
        setTotalPrice(bookingData.totalPrice || 0);
        // Find bus from busData
        const foundBus = data.buses.find(
          (b) => b.id === bookingData.bus?.id || b.number === bookingData.bus?.number
        );
        setBus(foundBus || bookingData.bus || null);
        setPassengers(
          (bookingData.selectedSeats || []).map((s) => ({ seat: s, name: "", age: "" }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [bookingId]);

  useEffect(() => {
    if ((!selectedSeats || !bus) && !loading) {
      navigate("/search");
    }
  }, [selectedSeats, bus, loading, navigate]);

  const handleChange = (index, field, value) => {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const incomplete = passengers.some((p) => !p.name.trim());
    if (incomplete) {
      alert("Please enter passenger name for all seats");
      return;
    }
    localStorage.setItem(
      `confirmation-${bookingId}`,
      JSON.stringify({
        bus,
        from,
        to,
        date,
        selectedSeats,
        totalPrice,
        passengers,
      })
    );
    navigate(`/confirm/${bookingId}`);
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, textAlign: "center" }}>Error: {error}</div>;
  if (!selectedSeats || !bus) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>No booking data</h3>
        <p>Please go back and select a bus and seats first.</p>
      </div>
    );
  }

  return (
    <div className="passenger-container">
      <div className="passenger-card">
        <h2>Passenger Details</h2>
        <div className="passenger-info">
          Booking for <strong>{bus.name || bus.number || bus.id}</strong> from <strong>{from}</strong> to <strong>{to}</strong> on <strong>{date}</strong>
        </div>
        <form className="passenger-form" onSubmit={submit}>
          {passengers.map((p, i) => (
            <div key={p.seat} className="passenger-seat">
              <strong>Seat {p.seat}</strong>
              <div style={{ display: "flex", gap: "4%" }}>
                <input
                  className="passenger-input"
                  placeholder="Passenger name"
                  value={p.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                  required
                />
                <input
                  className="passenger-input"
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) => handleChange(i, "age", e.target.value)}
                  type="number"
                  min="0"
                />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <p>Selected seats: {selectedSeats.join(", ")}</p>
            <p>Total price: ₹{totalPrice}</p>
            <button type="submit" className="passenger-btn">Confirm & Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}
