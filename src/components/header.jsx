import React from "react";
import Navbar from "./Navbar";
import HamburgerMenu from "./menu"; // Import the new component

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
        padding: "10px 40px", 
        position: "relative",
      }}
    >
      {/* 1. Left Side: Logo and Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Placeholder Circle */}
        <div
            style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                backgroundColor: '#E5E5E5',
                marginRight: '5px' 
            }} 
        />
        <h1
          style={{
            color: "#333",
            margin: 0,
            fontSize: 32,
            fontFamily: "'Sorts Mill Goudy', serif",
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          BioFlame
        </h1>
      </div>
      
      {/* 2. Center Position: Navbar */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <Navbar />
      </div>

      {/* 3. Right Side: Hamburger Menu */}
      <HamburgerMenu />
      
    </header>
  );
}