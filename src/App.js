import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import SearchBus from "./pages/SearchBus";
import BusList from "./pages/BusList";
import SeatSelection from "./pages/SeatSelection";
import Confirmation from "./pages/Confirmation";
import PassengerDetails from "./pages/PassengerDetails";
import AdminDashboard from "./pages/AdminDashboard";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        <Route path="/search" element={<SearchBus />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/seats/:busId" element={<SeatSelection />} />
        <Route path="/passenger/:bookingId" element={<PassengerDetails />} />
        <Route path="/confirm/:bookingId" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;