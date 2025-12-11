import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Confirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const confirmationData = JSON.parse(localStorage.getItem(`confirmation-${bookingId}`) || "{}");

  // If user opens the page directly without booking
  if (!confirmationData.bus) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>No Booking Found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
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
    <div style={{ width: "90%", margin: "30px auto", textAlign: "center" }}>
      <h1 style={{ color: "green" }}>🎉 Ticket Booked Successfully!</h1>

      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          maxWidth: "500px",
          textAlign: "left",
          background: "#f9f9f9"
        }}
      >
        <h2>Booking Details</h2>

        <p><strong>Bus Name:</strong> {bus.name}</p>
        <p><strong>Bus Type:</strong> {bus.type}</p>
        <p><strong>From:</strong> {from}</p>
        <p><strong>To:</strong> {to}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Total Amount:</strong> ₹{totalPrice}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          border: "none",
          background: "#0d6efd",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Go Home
      </button>
    </div>
  );
}

export default Confirmation;
