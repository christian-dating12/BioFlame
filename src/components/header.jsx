import React from "react";
import Navbar from "./Navbar";
import HamburgerMenu from "./menu";
import BioFlameLogo from "../assets/bioflame-logo.png"; 

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
        {/* Logo Image container (Replaces the placeholder circle) */}
        <div
            style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                backgroundColor: '#E5E5E5', // Keep the gray background/border look
                marginRight: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }} 
        >
            <img 
                src={BioFlameLogo} 
                alt="BioFlame Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </div>
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
          // FIX: Absolute positioning to ensure perfect horizontal centering
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