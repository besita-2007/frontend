import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PassengerDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const data = localStorage.getItem(`booking-${bookingId}`);
    if (!data) {
      navigate("/search");
      return;
    }
    setBooking(JSON.parse(data));
  }, [bookingId, navigate]);

  if (!booking) return <div>Loading...</div>;

  const submit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      `passenger-${bookingId}`,
      JSON.stringify({
        ...booking,
        passenger: { name, age }
      })
    );

    alert("Booking Confirmed!");
    navigate("/");
  };

  return (
    <div>
      <h2>Passenger Details</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default PassengerDetails;
