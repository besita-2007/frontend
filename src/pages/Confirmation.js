import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Confirmation.css"; // // Import CSS

function Confirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const confirmationData = JSON.parse(localStorage.getItem(`confirmation-${bookingId}`) || "{}"); //

  // If user opens the page directly without booking
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
    <div className="confirm-container"> // Apply class
      <h1 style={{ color: "green" }}>🎉 Ticket Booked Successfully!</h1>

      <div className="ticket-box"> // Apply class
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
        className="home-btn" // Apply class
      >
        Go Home
      </button>
    </div>
  );
}

export default Confirmation;