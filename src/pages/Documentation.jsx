import React from "react";
import Header from "../components/header";

const COLORS = {
  darkGreen: "#2E3F24",
  mediumGreen: "#A2B29A",
  tan: "#D9C08D",
  lightTanBackground: "#F2E8D9", // Cream/tan background color for the page body
  brown: "#704214",
  lightGray: "#E5E5E5",
  darkText: "#23320F",
  footerBackground: "#23320F",
  white: "#FFFFFF",
  sectionTitle: "#705D40", // Dark brown for the elegant titles
  digesterBackground: "#705D40", // Dark brown for the Digester Process section
  boxShadowDark: "0 4px 8px rgba(0,0,0,0.2)",
};

// --- Reusable Component for Benefit/Guide Cards (Used in Dashboard Guide) ---
const GuideCard = ({ number, title, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: "200px",
      margin: "0 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    {/* Image Placeholder */}
    <div
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: color,
        marginBottom: "10px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: COLORS.white,
        fontSize: "24px",
        fontWeight: "bold",
        border: `2px dashed ${COLORS.darkGreen}`,
      }}
    >
      image
    </div>
    {/* Title and Number */}
    <p
      style={{
        fontFamily: "sans-serif",
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: "bold",
        margin: "10px 0 0 0",
      }}
    >
      {title}
    </p>
    {number && (
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 14,
          color: COLORS.darkText,
          marginTop: "5px",
        }}
      >
        {number}
      </p>
    )}
  </div>
);

// --- Footer Component (Copied for completeness) ---
const Footer = () => {
    const IconPlaceholder = ({ children }) => (
        <span style={{ fontSize: '30px', margin: '0 15px', cursor: 'pointer', lineHeight: 1 }}>
            {children}
        </span>
    );
    
    return (
        <footer
            style={{
                backgroundColor: COLORS.footerBackground,
                color: COLORS.lightGray,
                padding: '30px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontFamily: 'sans-serif',
            }}
        >
            {/* Logo and Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <div 
                    style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        backgroundColor: COLORS.mediumGreen, 
                        marginRight: '15px' 
                    }} 
                />
                <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'normal', margin: 0 }}>
                        BioFlame
                    </h3>
                    <p style={{ fontSize: '14px', margin: 0, color: COLORS.mediumGreen }}>
                        Smart, Affordable Energy from Farm Waste.
                    </p>
                </div>
            </div>

            {/* Social Icons (using text placeholders for simplicity) */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <IconPlaceholder>&#9993;</IconPlaceholder>
                <IconPlaceholder>&#9742;</IconPlaceholder>
                <IconPlaceholder>&#xf39e;</IconPlaceholder>
                <IconPlaceholder>&#xf16d;</IconPlaceholder>
                <IconPlaceholder>&#xf167;</IconPlaceholder>
            </div>

            {/* Legal Links and Copyright */}
            <div style={{ textAlign: 'right', fontSize: '14px', margin: '10px 0' }}>
                <p style={{ margin: '0 0 5px 0' }}><a href="#" style={{ color: COLORS.lightGray, textDecoration: 'none' }}>Privacy Policy</a></p>
                <p style={{ margin: '0 0 5px 0' }}><a href="#" style={{ color: COLORS.lightGray, textDecoration: 'none' }}>Terms of Service</a></p>
                <p style={{ margin: 0 }}>&copy; 2025 BioFlame, Inc.</p>
            </div>
        </footer>
    );
};

export default function Documentation() {
  
  // Placeholder data for the User Manual slider
  const manualItems = [
    { number: '01', title: 'Lorem ipsum' },
    { number: '02', title: 'Lorem ipsum' },
    { number: '03', title: 'Lorem ipsum' },
    { number: '04', title: 'Lorem' },
  ];

  return (
    <div style={{ backgroundColor: COLORS.lightTanBackground, minHeight: '100vh' }}>
      <Header />
      
      {/* 1. Hero/Description Section */}
      <div style={{ padding: "60px 40px 0", maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "'Sorts Mill Goudy', serif",
            fontSize: "60px",
            color: COLORS.sectionTitle,
            marginBottom: "15px",
            lineHeight: 1,
            borderBottom: `2px solid ${COLORS.sectionTitle}`,
            display: "inline-block",
            paddingRight: "10px",
          }}
        >
          Documentation
        </h1>
        <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.6", maxWidth: "800px", marginBottom: "40px" }}>
          This documentation serves as your essential resource for operating, maintaining, and optimizing your smart biogas system. Find everything from daily operation checklists and feedstock guidelines to detailed IoT dashboard tutorials and critical safety protocols. Our goal is to ensure you have the necessary information for reliable, efficient, and safe energy production.
        </p>

        {/* 1b. User Manual / Slider Section */}
        <div
          style={{
            backgroundColor: COLORS.mediumGreen,
            borderRadius: "20px",
            padding: "40px 60px",
            boxShadow: COLORS.boxShadowDark,
          }}
        >
          <h2
            style={{
              fontFamily: "'Sorts Mill Goudy', serif",
              fontSize: "40px",
              color: COLORS.white,
              marginBottom: "40px",
              lineHeight: 1,
            }}
          >
            User Manual
          </h2>

          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "flex-end", 
              gap: "20px" 
            }}
          >
            {/* Image/Content Cards */}
            {manualItems.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                {/* Image Placeholder */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: COLORS.darkGreen, // Placeholder color
                    borderRadius: "15px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: COLORS.white,
                    fontSize: "18px",
                    fontWeight: "bold",
                    overflow: "hidden",
                    border: `2px dashed ${COLORS.white}`,
                  }}
                >
                  image
                </div>
                <p style={{ color: COLORS.white, fontSize: "18px", margin: "5px 0 0 0" }}>
                  {item.number}
                </p>
                <p style={{ color: COLORS.white, fontSize: "16px", margin: 0 }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          
          {/* Slider Controls */}
          <div style={{ textAlign: "left", marginTop: "30px" }}>
            <span 
              style={{ 
                fontSize: "30px", 
                color: COLORS.white, 
                cursor: "pointer", 
                marginRight: "15px" 
              }}
            >
              &#9664;
            </span> 
            <span 
              style={{ 
                fontSize: "30px", 
                color: COLORS.white, 
                cursor: "pointer" 
              }}
            >
              &#9654;
            </span> 
          </div>
        </div>
      </div>
      
      {/* 2. Digester Process Section */}
      <div 
        style={{ 
          backgroundColor: COLORS.digesterBackground, 
          padding: "80px 40px", 
          marginTop: "80px" 
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Sorts Mill Goudy', serif",
              fontSize: "40px",
              color: COLORS.lightTanBackground,
              marginBottom: "20px",
              lineHeight: 1,
            }}
          >
            Digester Process
          </h2>
          <p style={{ fontStyle: "italic", fontSize: "18px", color: COLORS.lightTanBackground, lineHeight: "1.8", maxWidth: "800px", marginBottom: "40px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {/* Collapsible/Accordion Placeholders */}
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'scroll', 
            paddingRight: '15px', 
            scrollbarColor: `${COLORS.tan} transparent`,
            scrollbarWidth: 'thin',
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                style={{
                  backgroundColor: COLORS.white,
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: COLORS.boxShadowDark,
                  marginBottom: "20px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#666",
                }}
              >
                Lorem ipsum dolor sit amet...
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 3. DASHBOARD GUIDE Section */}
      <div
        style={{
          padding: "80px 40px",
          backgroundColor: COLORS.lightTanBackground,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "sans-serif",
              fontSize: 40,
              color: COLORS.darkGreen,
              textAlign: "left",
              textTransform: "uppercase",
              marginBottom: "40px",
              fontWeight: "bold",
            }}
          >
            DASHBOARD GUIDE
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <GuideCard title="Energy Independence" color={COLORS.mediumGreen} />
            <GuideCard title="New Revenue Stream" color={COLORS.tan} number="02" />
            <GuideCard title="Sustainability" color={COLORS.mediumGreen} number="03" />
            <GuideCard title="Smart Automation" color={COLORS.tan} number="04" />
          </div>
          {/* Navigation Arrows Placeholder (Simplified) */}
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: COLORS.darkText,
              fontSize: "24px",
            }}
          >
            <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9664;</span> {/* Left Arrow */}
            <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9654;</span> {/* Right Arrow */}
          </div>
        </div>
      </div>
      
      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}