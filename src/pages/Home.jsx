import React from "react";
import Header from "../components/header";
import Footer from "../components/footer"; 
import backgroundImage from "../assets/home.png";
import missionImage from "../assets/mission.png";
import visionImage from "../assets/vision.png";

// --- BENEFIT IMAGES ---
import benefitContent1Image from "../assets/energy.jpg"; 
import benefitContent2Image from "../assets/revenue.jpg"; 
import benefitContent3Image from "../assets/sustain.jpg"; 
import benefitContent4Image from "../assets/iot.png"; 

const COLORS = {
  // --- Colors based on the images ---
  darkGreen: "#2E3F24", // Mission/Vision dark block, Footer background
  mediumGreen: "#A2B29A", // Mission/Vision light block, Benefits cards
  tan: "#D9C08D", // Benefits 02/04
  
  // General Text and UI colors
  lightGray: "#E5E5E5", 
  darkText: "#23320F",
  white: "#FFFFFF",
  placeholderText: "#333333", 
  numberGray: '#888888',
  darkLine: '#333333',
};

// --- Reusable Component for Benefit Cards ---
const BenefitCard = ({ number, title, color, image }) => (
  <div
    style={{
      flex: 1,
      minWidth: "200px",
      margin: "0 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      maxWidth: "250px", 
    }}
  >
    {/* Image/Color Block */}
    <div
      style={{
        width: "100%",
        height: "300px",
        // RESTORED: Solid Background Color
        backgroundColor: color, 
        marginBottom: "10px",
        borderRadius: "12px", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", 
      }}
    >
      {/* Image sits on top of the color */}
      <img 
        src={image} 
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    
    {/* Number and Title */}
    <div style={{ marginTop: '5px' }}>
        {number && (
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: COLORS.darkText, margin: "0 0 2px 0" }}>
            {number}
        </p>
        )}
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: COLORS.darkText, fontWeight: "bold", margin: "0" }}>
            {title}
        </p>
    </div>
  </div>
);

// --- Main Home Component ---
export default function Home() {
  return (
    <div style={{ backgroundColor: COLORS.white }}>
      <Header />
      
      {/* 1. Hero Section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: 'column',
          alignItems: "center", 
          textAlign: "center",
          backgroundColor: COLORS.white, 
        }}
      >
        <div style={{ padding: "40px 40px 20px 40px", textAlign: 'center' }}>
          <h1 style={{ color: COLORS.darkGreen, fontSize: 50, fontFamily: "'Sorts Mill Goudy', serif", lineHeight: "1.2", margin: "0 0 10px 0", fontWeight: 800, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
            Farming Meets Future Tech
          </h1>
          <p style={{ color: COLORS.darkText, fontSize: 16, fontFamily: "sans-serif", lineHeight: "1.5", margin: "0" }}>
            BioFlame converts agricultural manure into a continuous source of sustainable biogas. <br /> Leveraging cutting-edge IoT intelligence, we offer farmers a reliable, efficient, and automated path to energy independence and waste reduction.
          </p>
        </div>
        
        <div style={{ width: '100%', minHeight: '80vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '0 0 40px 80px', boxSizing: 'border-box' }}>
            <h2 style={{ color: COLORS.white, fontSize: 32, fontFamily: "'Sorts Mill Goudy', serif" }}>
                Where Farms Create Energy
            </h2>
        </div>
      </div>

      {/* 2. Mission and Vision Sections */}
      <div style={{ padding: "80px 10px", backgroundColor: "#fff" }}>
        
        {/* MISSION ROW */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "100px", gap: "80px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: "400px", height: "400px" }}>
              {/* RESTORED: Solid Color Block (No Image) */}
              <div style={{ width: "300px", height: "300px", backgroundColor: COLORS.mediumGreen, position: "absolute", left: 0, top: 0, borderRadius: '8px' }}></div>
              
              {/* Image Block */}
              <div style={{ width: "300px", height: "300px", backgroundColor: COLORS.darkGreen, position: "absolute", right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: '8px', overflow: 'hidden' }}>
                <img src={missionImage} alt="Mission Decor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            
            <div style={{ maxWidth: "500px", textAlign: "left" }}>
                <h2 style={{ fontFamily: "sans-serif", fontSize: 40, color: COLORS.darkText, textTransform: "uppercase", fontWeight: 900, marginBottom: "15px" }}>OUR MISSION</h2>
                <p style={{ fontFamily: "sans-serif", fontSize: 20, lineHeight: "1.6", color: "#555", fontStyle: "italic" }}>
                    To design a small-scale, IoT-optimized system that converts manure into biogas, proving its technical efficiency and economic affordability for local farm energy independence.
                </p>
            </div>
        </div>

        {/* VISION ROW */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "80px", flexWrap: "wrap-reverse" }}>
            <div style={{ maxWidth: "500px", textAlign: "left" }}>
                <h2 style={{ fontFamily: "sans-serif", fontSize: 40, color: COLORS.darkText, textTransform: "uppercase", fontWeight: 900, marginBottom: "15px" }}>OUR VISION</h2>
                <p style={{ fontFamily: "sans-serif", fontSize: 20, lineHeight: "1.6", color: "#555", fontStyle: "italic" }}>
                    To pioneer a validated, low-cost model for smart biogas technology that is easily replicable and accessible to small and underserved farming operations.
                </p>
            </div>
            
            <div style={{ position: "relative", width: "400px", height: "400px" }}>
              {/* RESTORED: Solid Color Block (No Image) */}
              <div style={{ width: "300px", height: "300px", backgroundColor: COLORS.darkGreen, position: "absolute", right: 0, bottom: 0, borderRadius: '8px' }}></div>
              
              {/* Image Block */}
              <div style={{ width: "300px", height: "300px", backgroundColor: COLORS.mediumGreen, position: "absolute", left: 0, top: 0, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: '8px', overflow: 'hidden' }}>
                <img src={visionImage} alt="Vision Decor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
        </div>
      </div>
      
      {/* 3. BENEFITS Section */}
      <div style={{ padding: "80px 10px", backgroundColor: "#fff", textAlign: 'right' }}>
        <h2 style={{ fontFamily: "sans-serif", fontSize: 60, fontWeight: 900, color: COLORS.darkText, textTransform: "uppercase", marginBottom: "40px", marginRight: "20px", lineHeight: 1, textAlign: 'right' }}>
          BENEFITS
        </h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", padding: "0 20px" }}>
          <BenefitCard title="Energy Independence" color={COLORS.mediumGreen} number="01" image={benefitContent1Image} />
          <BenefitCard title="New Revenue Stream" color={COLORS.tan} number="02" image={benefitContent2Image} />
          <BenefitCard title="Sustainability" color={COLORS.mediumGreen} number="03" image={benefitContent3Image} />
          <BenefitCard title="IoT" color={COLORS.tan} number="04" image={benefitContent4Image} />
        </div>
        
        <div style={{ textAlign: "center", marginTop: "30px", color: COLORS.darkText, fontSize: "24px" }}>
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9664;</span> 
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9654;</span> 
        </div>
      </div>
      
      <Footer />
    </div>
  );
}