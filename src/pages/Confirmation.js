import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const confirmationData = JSON.parse(localStorage.getItem(`confirmation-${bookingId}`) || "{}"); //

  if (!confirmationData.bus) {
    return (
      <div className="confirm-container" style={{ marginTop: "40px" }}>
        <h2>No Booking Found</h2>
        <button onClick={() => navigate("/")} className="home-btn">Go Home</button>
      </div>
    );
  }

  const {
    bus,
    from,
    to,
    date,
    selectedSeats,
    totalPrice
  } = confirmationData;

  return (
    <div className="confirm-container"> 
      <h1 style={{ color: "green" }}>🎉 Ticket Booked Successfully!</h1>

      <div className="ticket-box">
        <h2>Booking Details</h2>

        <p><strong>Bus Name:</strong> {bus.name || bus.number}</p>
        <p><strong>Bus Type:</strong> {bus.type}</p>
        <p><strong>From:</strong> {from}</p>
        <p><strong>To:</strong> {to}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Total Amount:</strong> ₹{totalPrice}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="home-btn" 
      >
        Go Home
      </button>
    </div>
  );
}

export default Confirmation;