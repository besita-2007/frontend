import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBus from "./pages/SearchBus";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddBus from "./pages/admin/AddBus";
import ManageBuses from "./pages/admin/ManageBuses";

import AdminRoute from "./pages/routes/AdminRoute";
import Navbar from "./components/Navbar";
import BusList from "./pages/BusList";


function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/searchbus" element={<SearchBus />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/seats/:busId" element={<SeatSelection />} />
        <Route path="/passenger/:bookingId" element={<PassengerDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-bus"
          element={
            <AdminRoute>
              <AddBus />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-buses"
          element={
            <AdminRoute>
              <ManageBuses />
            </AdminRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
