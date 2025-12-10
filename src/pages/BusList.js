import { useLocation, useNavigate } from "react-router-dom";
import "./BusList.css";

function BusList() {
  const location = useLocation();
  const navigate = useNavigate();

  const { from, to, date } = location.state || {};

  // Fake sample buses
  const buses = [
    {
      id: 1,
      name: "TNSTC Express",
      type: "AC Sleeper",
      time: "08:00 AM",
      price: 450,
    },
    {
      id: 2,
      name: "GreenLine Travels",
      type: "Non-AC Seater",
      time: "10:30 AM",
      price: 300,
    },
    {
      id: 3,
      name: "KPN Travels",
      type: "AC Seater",
      time: "01:00 PM",
      price: 550,
    },
  ];

  const goToSeat = (bus) => {
    navigate("/select-seat", {
      state: {
        bus,
        from,
        to,
        date,
      },
    });
  };

  return (
    <div className="buslist-container">
      <h2>Buses from {from} to {to}</h2>
      <p>Date: {date}</p>

      {buses.map((bus) => (
        <div key={bus.id} className="bus-card">
          <h3>{bus.name}</h3>
          <p>{bus.type}</p>
          <p>Departure: {bus.time}</p>
          <p>₹ {bus.price}</p>

          <button onClick={() => goToSeat(bus)} className="select-btn">
            Select Seats
          </button>
        </div>
      ))}
    </div>
  );
}

export default BusList;
