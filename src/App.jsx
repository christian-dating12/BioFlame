import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import Maintenance from "./pages/Maintenance";
import Documentation from "./pages/Documentation";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#FFFFFF", // dark green background for pages
        boxSizing: "border-box",
        padding: 40,
        color: "#FFFFFF", // white text on pages
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </div>
  );
}
