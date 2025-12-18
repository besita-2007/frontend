import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <section className="hero">
        <div className="hero-overlay">
          <h1>Book Your Bus Tickets Easily</h1>
          <p>Safe • Comfortable • Affordable travel across cities</p>
          <button
            className="cta-btn"
            onClick={() => navigate("/searchbus")}
          >
            Explore Buses
          </button>
        </div>
      </section>

      <section className="about">
        <h2>About Our Brand</h2>
        <p>
          We provide reliable and comfortable bus journeys with trusted
          operators. Our mission is to make travel simple, affordable,
          and stress-free for everyone.
        </p>
      </section>

      <section className="categories">
        <h2>Popular Routes</h2>

        <div className="category-grid">
          <div
            className="category-card"
            onClick={() => navigate("/searchbus")}
          >
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
              alt="Luxury Buses"
            />
            <h3>Luxury Buses</h3>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/searchbus")}
          >
            <img
              src="https://images.unsplash.com/photo-1509749837427-ac94a2553d0e"
              alt="Sleeper Coaches"
            />
            <h3>Sleeper Coaches</h3>
          </div>

          <div
            className="category-card"
            onClick={() => navigate("/searchbus")}
          >
            <img
              src="https://th.bing.com/th/id/OIP.R9Oh2Mn3mhWPpQO-0WmmUwHaFj?w=221&h=180&c=7&r=0&o=5&cb=ucfimg2&dpr=1.3&pid=1.7&ucfimg=1"
              alt="AC Seaters"
            />
            <h3>AC Seaters</h3>
          </div>
        </div>
      </section>

    </div>
  );
}
