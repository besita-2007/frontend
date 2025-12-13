import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form"; 
import "./PassengerDetails.css";

export default function PassengerDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bus, setBus] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const {
  register,          // ✅ ADD THIS
  control,
  handleSubmit,
  formState: { errors }
} = useForm({
  defaultValues: {
    passengers: []
  }
});

  const { fields, append } = useFieldArray({
    control,
    name: "passengers",
  });

  useEffect(() => {
    fetch("/bus-data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bus data");
        return res.json();
      })
      .then((data) => {
        const bookingData = JSON.parse(localStorage.getItem(`booking-${bookingId}`) || "{}");
        const seats = bookingData.selectedSeats || [];
        
        setSelectedSeats(seats);
        setFrom(bookingData.from || "");
        setTo(bookingData.to || "");
        setDate(bookingData.date || "");
        setTotalPrice(bookingData.totalPrice || 0);

        const foundBus = data.buses.find(
          (b) => b.id === bookingData.bus?.id || b.number === bookingData.bus?.number
        );
        setBus(foundBus || bookingData.bus || null);
        
        setLoading(false);

        if (seats.length > 0 && fields.length === 0) {
          seats.forEach(seat => {
            append({ seat: seat, name: "", age: "" });
          });
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [bookingId, append, fields.length]); 

  useEffect(() => {
    if ((!selectedSeats || !bus) && !loading) {
      navigate("/search");
    }
  }, [selectedSeats, bus, loading, navigate]);

  const onSubmit = (data) => {
    localStorage.setItem(
      `confirmation-${bookingId}`,
      JSON.stringify({
        bus,
        from,
        to,
        date,
        selectedSeats,
        totalPrice,
        passengers: data.passengers, 
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
        
        <form className="passenger-form" onSubmit={handleSubmit(onSubmit)}>
          
          {fields.map((field, index) => (
            <div key={field.id} className="passenger-seat">
              <strong>Seat {field.seat}</strong>
              <div style={{ display: "flex", gap: "4%" }}>
                
                <div style={{ width: "48%" }}>
                  <input
                    className="passenger-input"
                    placeholder="Passenger name"
                    {...register(`passengers.${index}.name`, { 
                        required: "Name is required" 
                    })}
                  />
                  {errors.passengers?.[index]?.name && (
                      <span className="error-message">{errors.passengers[index].name.message}</span>
                  )}
                </div>
                
                <div style={{ width: "48%" }}>
                  <input
                    className="passenger-input"
                    placeholder="Age"
                    type="number"
                    min="1"
                    {...register(`passengers.${index}.age`, { 
                      valueAsNumber: true, 
                      min: { value: 1, message: "Age must be > 0" }
                    })}
                  />
                  {errors.passengers?.[index]?.age && (
                      <span className="error-message">{errors.passengers[index].age.message}</span>
                  )}
                </div>
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