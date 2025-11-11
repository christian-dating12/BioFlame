import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const mainMenu = ["Home", "Dashboard", "Maintenance", "Documentation"];
  const location = useLocation();
  const routeMap = {
    Home: "/",
    Dashboard: "/dashboard",
    Maintenance: "/maintenance",
    Documentation: "/documentation",
  };

  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#",""),16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = ((num >> 8) & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
    return "#" + (
      0x1000000 +
      (R<255?R<1?0:R:255)*0x10000 +
      (G<255?G<1?0:G:255)*0x100 +
      (B<255?B<1?0:B:255)
    ).toString(16).slice(1);
  };

  const outerColor = "#23320F"; // outer container color
  const activeColor = "#6C8E3E"; // active button color
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      {/* Outer container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 5,
          backgroundColor: outerColor,
          borderRadius: 12, // slightly rounded outer shape
          gap: 10,
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
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: 16,
                padding: "10px 25px",
                backgroundColor: isActive
                  ? activeColor
                  : hover
                  ? lightenColor(outerColor, 15)
                  : outerColor,
                borderRadius: 10, // less rounded, more square-like
                transition: "background 0.3s",
                fontFamily: "'Sorts Mill Goudy', serif",
              }}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* Hamburger menu */}
      <div
        onClick={() => setShowExtra(!showExtra)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 25,
          height: 18,
          cursor: "pointer",
        }}
      >
        <span style={{ height: 3, background: "#23320F", borderRadius: 2 }} />
        <span style={{ height: 3, background: "#23320F", borderRadius: 2 }} />
        <span style={{ height: 3, background: "#23320F", borderRadius: 2 }} />
      </div>

      {/* Extra dropdown menu */}
      {showExtra && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            background: "#6C8E3E",
            borderRadius: 12,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            zIndex: 100,
          }}
        >
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "'Sorts Mill Goudy', serif",
            }}
          >
            About Us
          </a>
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "'Sorts Mill Goudy', serif",
            }}
          >
            Contact Us
          </a>
        </div>
      )}
    </div>
  );
}
