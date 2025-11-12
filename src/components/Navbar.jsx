import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const mainMenu = ["Home", "Maintenance", "Documentation", "Dashboard"];
  const location = useLocation();
  const routeMap = {
    Home: "/",
    Maintenance: "/maintenance",
    Documentation: "/documentation",
    Dashboard: "/dashboard",
  };

  // Define colors based on the image
  const outerColor = "#2E3F24"; // Dark Green/Olive for the navbar background
  const activeColor = "#6C8E3E"; // Lighter Green for the active button
  const hoverColor = "#556A3D"; // Slightly lighter dark green for hover

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      
      {/* Main Navigation Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: '5px',
          backgroundColor: outerColor,
          borderRadius: 25, // Highly rounded pill shape
          gap: 5,
        }}
      >
        {mainMenu.map((item) => {
          const isActive = location.pathname === routeMap[item];
          const [hover, setHover] = useState(false);

          return (
            <Link
              key={item}
              to={routeMap[item]}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                textDecoration: "none",
                color: isActive ? outerColor : "#FFFFFF", // Active text color is dark if background is light green
                fontWeight: "bold",
                fontSize: 16,
                padding: "10px 25px",
                backgroundColor: isActive
                  ? activeColor
                  : hover
                  ? hoverColor // Use a slightly lighter dark green on hover
                  : outerColor,
                borderRadius: 20, // Match the pill shape
                transition: "background 0.3s",
                fontFamily: "sans-serif", // Using sans-serif to match the clean text in the image
              }}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
}