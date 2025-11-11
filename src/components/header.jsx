import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
        padding: "0 20px",
      }}
    >
      {/* Logos */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/biogas.png"
            alt="BioFlame Logo"
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
          <h1
            style={{
              color: "#6C8E3E", // white text
              margin: 0,
              fontSize: 24,
              fontFamily: "'Sorts Mill Goudy', serif",
            }}
          >
            BioFlame
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/hiraya.png"
            alt="Hiraya Logo"
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
          <h1
            style={{
              color: "#6C8E3E", // white text
              margin: 0,
              fontSize: 24,
              fontFamily: "'Sorts Mill Goudy', serif",
            }}
          >
            Hiraya
          </h1>
        </div>
      </div>

      {/* Navbar */}
      <div style={{ transform: "translateX(-20px)" }}>
        <Navbar />
      </div>
    </header>
  );
}
