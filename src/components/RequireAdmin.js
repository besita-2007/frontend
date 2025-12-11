import React from "react";
import { Navigate } from "react-router-dom";

// RequireAdmin can be used either as a wrapper element that receives children
// or as a route guard returning an <Outlet />. To keep usage simple we accept
// children and render them when authorized.
export default function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children || null;
}