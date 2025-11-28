import React from "react";
import Header from "../components/header";
import Footer from "../components/footer"; 
import maintenanceImage from "../assets/maintenance-bg.png";

const COLORS = {
  darkGreen: "#2E3F24",
  mediumGreen: "#A2B29A",
  white: "#FFFFFF",
  lightGold: "#D9C08D",
  darkRed: "#9E3C36", 
  lightGray: "#E5E5E5",
  mediumGray: "#888888", 
  darkText: "#23320F",
  footerBackground: "#23320F", 
  tableHeader: "#FFFFFF", 
  tableLightRow: "#FFFFFF", 
  tableGreenStatus: "#A2B29A",
};

export default function Maintenance() {
  
    // Data for Safety Parameters Table
    const safetyData = [
        { param: "TEMPERATURE", safe: "25-40C", warning: "50-60C", danger: ">60C", status: "SAFE" },
        { param: "PH LEVEL", safe: "6-7.4", warning: "6.4-6.6", danger: "<6.4", status: "SAFE" },
        { param: "WATER LEVEL", safe: " 44 cm-80 cm", warning: "80-89cm", danger: "<89", status: "SAFE" },
        { param: "METHANE %", safe: "50-70%", warning: "<50%", danger: "<60%", status: "SAFE" },
        { param: "CARBON DIOXIDE %", safe: "30-45%", warning: "<45%", danger: "<60%", status: "SAFE" },
    ];

    // Data for Maintenance Schedule
    const scheduleData = [
      { 
        freq: "Daily/Weekly (User)", 
        activity: "Check digester temperature and pH readings via the IoT Dashboard.", 
        purpose: "Confirm optimal conditions for microbial activity and early detection of fluctuations." 
      },
      { 
        freq: "Monthly (User)", 
        activity: "Inspect mixer, pumps, and pipe connections for leaks or blockages.", 
        purpose: "Prevent material build-up and ensure smooth flow of slurry." 
      },
      { 
        freq: "Quarterly (Technician)", 
        activity: "Calibrate key sensors (pH, temperature, gas composition).", 
        purpose: "Ensure accuracy of IoT data for reliable system optimization." 
      },
      { 
        freq: "Annually (Technician)", 
        activity: "Comprehensive internal cleaning and inspection of the digester tank.", 
        purpose: "Prevent sediment buildup and evaluate structural integrity." 
      },
    ];
    
  return (
    <div style={{ backgroundColor: COLORS.lightGray, minHeight: "100vh" }}>
      <Header />
      
      {/* 1. Hero Section */}
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundImage: `linear-gradient(rgba(46, 63, 36, 0.7), rgba(46, 63, 36, 0.7)), url(${maintenanceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ 
          color: COLORS.white, 
          fontFamily: "'Sorts Mill Goudy', serif", 
          fontSize: "60px", 
          marginBottom: "20px" 
        }}>
          System Maintenance
        </h1>
        <p style={{ 
          color: COLORS.lightGold, 
          fontSize: "20px", 
          maxWidth: "600px", 
          lineHeight: "1.6" 
        }}>
          Ensuring optimal performance and safety through regular system checks and automated monitoring.
        </p>
      </div>
      
      {/* (REMOVED SYSTEM STATUS SECTION HERE) */}

      {/* 2. MAINTENANCE SCHEDULE */}
      <div style={{ padding: "0 40px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: "40px",
            color: COLORS.darkGreen,
            marginBottom: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          MAINTENANCE SCHEDULE
        </h2>
        <p style={{ 
            fontStyle: "italic", 
            fontSize: "18px", 
            color: "#555", 
            marginBottom: "40px",
            maxWidth: "900px" 
        }}>
            The system requires two levels of maintenance: routine checks performed by farm personnel, and less frequent, specialized checks handled by certified technicians.
        </p>

        {/* White Card Container */}
        <div 
          style={{
            backgroundColor: COLORS.white,
            borderRadius: "30px", 
            padding: "50px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  {/* Gray Background Headers */}
                  <th style={{ backgroundColor: COLORS.mediumGray, color: COLORS.white, textAlign: "left", fontSize: "20px", fontWeight: "bold", width: "25%", padding: "10px", textTransform: 'uppercase' }}>FREQUENCY</th>
                  <th style={{ backgroundColor: COLORS.mediumGray, color: COLORS.white, textAlign: "left", fontSize: "20px", fontWeight: "bold", width: "40%", padding: "10px", textTransform: 'uppercase' }}>ACTIVITY</th>
                  <th style={{ backgroundColor: COLORS.mediumGray, color: COLORS.white, textAlign: "left", fontSize: "20px", fontWeight: "bold", width: "35%", padding: "10px", textTransform: 'uppercase' }}>PURPOSE</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, index) => (
                  <tr key={index} style={{ verticalAlign: "top" }}>
                    <td style={{ padding: "15px 10px", fontSize: "16px", color: "#333", fontWeight: "500" }}>{row.freq}</td>
                    <td style={{ padding: "15px 10px", fontSize: "16px", color: "#333" }}>{row.activity}</td>
                    <td style={{ padding: "15px 10px", fontSize: "16px", color: "#333" }}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* 3. SAFETY PARAMETERS & GUIDELINES */}
      <div style={{ padding: "0 40px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: "40px",
            color: COLORS.darkGreen,
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          SAFETY PARAMETERS & GUIDELINES
        </h2>
        
        <div 
          style={{
            backgroundColor: COLORS.white,
            borderRadius: "20px",
            padding: "40px",
            marginTop: "40px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ fontFamily: "'Sorts Mill Goudy', serif", fontSize: "32px", color: COLORS.darkText, marginBottom: "30px" }}>
            Safety Levels
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table 
              style={{ 
                width: "100%", 
                borderCollapse: "collapse", 
                fontFamily: "sans-serif", 
                color: "#000" 
              }}
            >
              <thead>
                <tr style={{ textAlign: "center", textTransform: "uppercase", fontSize: "14px" }}>
                  <th style={{ backgroundColor: COLORS.lightGold, padding: "15px 10px", borderTopLeftRadius: "8px" }}>PARAMETER</th>
                  <th style={{ backgroundColor: COLORS.lightGold, padding: "15px 10px" }}>SAFE</th>
                  <th style={{ backgroundColor: COLORS.lightGold, padding: "15px 10px" }}>WARNING</th>
                  <th style={{ backgroundColor: COLORS.lightGold, padding: "15px 10px" }}>DANGER</th>
                  <th style={{ backgroundColor: COLORS.lightGold, padding: "15px 10px", borderTopRightRadius: "8px" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {safetyData.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: COLORS.tableLightRow, borderBottom: `1px solid ${COLORS.lightGray}` }}>
                    <td style={{ padding: "15px 10px", fontWeight: "bold", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.param}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.safe}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.warning}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.danger}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", backgroundColor: COLORS.tableGreenStatus, fontWeight: "bold", color: "#000" }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}