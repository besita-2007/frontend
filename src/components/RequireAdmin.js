import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children || null;
}