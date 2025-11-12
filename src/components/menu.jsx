import React, { useState } from 'react';

const COLORS = {
  activeGreen: "#6C8E3E", // Lighter Green for the icon
  darkGreen: "#2E3F24", // Dark Green for the dropdown background
  white: "#FFFFFF",
};

export default function HamburgerMenu() {
    const [showExtra, setShowExtra] = useState(false);
    
    return (
        <div style={{ position: 'relative' }}>
            {/* Hamburger icon (Trigger) */}
            <div
                onClick={() => setShowExtra(!showExtra)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 30,
                    height: 25,
                    cursor: "pointer",
                    margin: '0 10px',
                    zIndex: 20, // Ensure it sits above other content
                }}
            >
                <span style={{ height: 4, background: COLORS.activeGreen, borderRadius: 2 }} />
                <span style={{ height: 4, background: COLORS.activeGreen, borderRadius: 2 }} />
                <span style={{ height: 4, background: COLORS.activeGreen, borderRadius: 2 }} />
            </div>

            {/* Extra dropdown menu */}
            {showExtra && (
                <div
                    style={{
                        position: "absolute",
                        top: 50, // Position below the icon
                        right: 0,
                        background: COLORS.darkGreen,
                        borderRadius: 8,
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        zIndex: 100,
                        minWidth: '120px'
                    }}
                >
                    <a
                        href="#"
                        style={{
                            textDecoration: "none",
                            color: COLORS.white,
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            padding: '5px 10px'
                        }}
                    >
                        About Us
                    </a>
                    <a
                        href="#"
                        style={{
                            textDecoration: "none",
                            color: COLORS.white,
                            fontSize: 14,
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            padding: '5px 10px'
                        }}
                    >
                        Contact Us
                    </a>
                </div>
            )}
        </div>
    );
}