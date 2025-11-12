import React from 'react';
// Assuming these logo imports are available
import BioFlameLogo from "../assets/bioflame-logo.png"; 
import HirayaLogo from "../assets/hiraya.png";

// Define colors used in the component
const COLORS = {
  // Color from the image: Dark Olive Green background
  footerBackground: '#2E3F24', 
  // Light Gray/White text color
  lightGray: '#E5E5E5', 
  // Green accent color (same as Navbar active link)
  mediumGreen: '#A2B29A', 
  // Darker text/logo color for contrast (BioFlame)
  darkText: '#333', 
  // White color for icons
  white: '#FFFFFF',
};

// --- Footer Component ---
export default function Footer() {
    // Icons are represented using placeholders matching the image structure
    const IconPlaceholder = ({ children }) => (
        <span 
            style={{ 
                fontSize: '30px', 
                margin: '0 10px', 
                cursor: 'pointer', 
                lineHeight: 1,
                color: COLORS.white // White icons against dark green
            }}
        >
            {children}
        </span>
    );
    
    return (
        <footer
            style={{
                backgroundColor: COLORS.footerBackground,
                color: COLORS.lightGray,
                // Reduced vertical padding from 40px to 20px
                padding: '20px 40px', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontFamily: 'sans-serif',
                minHeight: 'auto', 
                position: 'relative', 
            }}
        >
            {/* 1. Left Side: BioFlame Logo and Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                {/* Placeholder Circle (BioFlame) */}
                <div 
                    style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        backgroundColor: COLORS.lightGray, 
                        marginRight: '15px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} 
                >
                    {/* *** CHANGE: BioFlame Logo Image, filling container *** */}
                    <img 
                        src={BioFlameLogo} 
                        alt="BioFlame Logo" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <h3 style={{ 
                        fontSize: '30px', 
                        fontWeight: 'normal', 
                        margin: 0,
                        fontFamily: "'Sorts Mill Goudy', serif",
                        fontStyle: 'italic',
                        color: COLORS.lightGray, 
                    }}>
                        BioFlame
                    </h3>
                    <p style={{ 
                        fontSize: '14px', 
                        margin: 0, 
                        color: COLORS.mediumGreen,
                        fontWeight: 'lighter'
                    }}>
                        Smart, Affordable Energy from Farm Waste.
                    </p>
                </div>
            </div>

            {/* 2. Center: Social Icons and Legal Links (Combined into one continuous line) */}
            <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    margin: '10px 0',
                    flexGrow: 1, 
                    textAlign: 'center'
                }}
            >
                {/* Social Icons (using generic characters as placeholders) */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 15px 0' }}>
                    <IconPlaceholder>&#9993;</IconPlaceholder> {/* Mail */}
                    <IconPlaceholder>&#9742;</IconPlaceholder> {/* Phone */}
                    <IconPlaceholder>&#xf39e;</IconPlaceholder> {/* Facebook */}
                    <IconPlaceholder>&#xf16d;</IconPlaceholder> {/* Instagram */}
                    <IconPlaceholder>&#xf167;</IconPlaceholder> {/* YouTube */}
                </div>
                
                {/* Legal Links and Copyright (Single Line) */}
                <div style={{ textAlign: 'center', fontSize: '14px', whiteSpace: 'nowrap' }}>
                    <p style={{ margin: 0, color: COLORS.lightGray }}>
                        <a href="#" style={{ color: COLORS.lightGray, textDecoration: 'none' }}>Privacy Policy</a> 
                        {' | '}
                        <a href="#" style={{ color: COLORS.lightGray, textDecoration: 'none' }}>Terms of Service</a>
                        {' | '}
                        &copy; 2025 BioFlame, Inc.
                    </p>
                </div>
            </div>

            {/* 3. Right Side: Hiraya Logo and Tagline (Added right padding to the whole container) */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                margin: '10px 0', 
                textAlign: 'right',
                // Added padding to the right side of the Hiraya block
                paddingRight: '10px' 
            }}>
                <div>
                    <h3 style={{ 
                        fontSize: '30px', 
                        fontWeight: 'normal', 
                        margin: 0,
                        fontFamily: "'Sorts Mill Goudy', serif",
                        fontStyle: 'italic',
                        color: COLORS.lightGray, 
                    }}>
                        Hiraya
                    </h3>
                    <p style={{ 
                        fontSize: '14px', 
                        margin: 0, 
                        color: COLORS.mediumGreen,
                        fontWeight: 'lighter'
                    }}>
                        Childhood Play Farm
                    </p>
                </div>
                {/* Placeholder Circle (Hiraya) */}
                <div 
                    style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        backgroundColor: COLORS.lightGray, 
                        marginLeft: '15px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} 
                >
                    {/* *** CHANGE: Hiraya Logo Image, filling container *** */}
                    <img 
                        src={HirayaLogo} 
                        alt="Hiraya Logo" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>

        </footer>
    );
};