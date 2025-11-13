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
  darkText: "#23320F",
  footerBackground: "#23320F", 
  tableHeader: "#D9C08D", 
  tableLightRow: "#F5F5F5", 
  tableGreenStatus: "#A2B29A",
};

// --- IoT Box Component (Reused) ---
const IoTBox = ({ title, children, isCentered }) => (
    <div 
        style={{
            width: isCentered ? "60%" : "45%", 
            minWidth: "300px",
            maxWidth: isCentered ? "600px" : "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        }}
    >
        <div
            style={{
                backgroundColor: COLORS.white,
                borderRadius: "15px",
                border: `3px solid ${COLORS.darkRed}`,
                padding: "30px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                marginBottom: "20px",
                fontStyle: "italic",
                fontSize: "16px",
                color: "#444",
            }}
        >
            {children}
        </div>
        <h3
            style={{
                fontFamily: "sans-serif",
                fontSize: "24px",
                fontWeight: "bold",
                color: COLORS.darkText,
                lineHeight: 1,
            }}
        >
            {title}
        </h3>
    </div>
);


export default function Maintenance() {
  
    const tableData = [
        { param: "TEMPERATURE", safe: "25–40C", warning: "50–60C", danger: ">60C", status: "SAFE" },
        { param: "PH LEVEL", safe: "6–7.4", warning: "6.4–6.6", danger: "<6.4", status: "SAFE" },
        { param: "WATER LEVEL", safe: "WATER LEVEL", warning: "WATER LEVEL", danger: "WATER LEVEL", status: "SAFE" },
        { param: "METHANE %", safe: "50–70%", warning: "<50%", danger: "<60%", status: "SAFE" },
        { param: "CARBON DIOXIDE %", safe: "30–45%", warning: "30–45%", danger: "45–60%", status: "SAFE" },
    ];
    
  return (
    <div style={{ backgroundColor: COLORS.lightGray }}> {/* Main page background */}
      <Header />
      
      {/* 1. Hero Section (Image Placeholder) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "40px auto 0 auto",
          maxWidth: "1400px", 
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "500px", 
            display: "flex",
            justifyContent: "center", 
            alignItems: "flex-start",
            padding: "80px 20px",         
            backgroundImage: `linear-gradient(rgba(46, 63, 36, 0.6), rgba(46, 63, 36, 0.6)), url(${maintenanceImage})`,            
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          {/* Text Content */}
          <div
            style={{
              maxWidth: "600px",
              textAlign: "left",
              padding: "20px",
              background: "rgba(0,0,0,0.1)", 
              borderRadius: "10px",
              zIndex: 1,
            }}
          >
            <h1
              style={{
                fontFamily: "'Sorts Mill Goudy', serif",
                fontSize: "60px",
                color: COLORS.lightGold,
                marginBottom: "15px",
                lineHeight: "1.1",
              }}
            >
              System Maintenance
            </h1>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "18px",
                color: COLORS.white,
                lineHeight: "1.6",
              }}
            >
              Maintaining your BioFlame unit is crucial for ensuring continuous, optimal biogas production and efficiency. Our IoT-integrated system is designed to minimize hands-on intervention, but scheduled checks and sensor calibration are required.
            </p>
          </div>
        </div>
      </div>
      
      {/* 2. MAINTENANCE SCHEDULE (omitted for brevity) */}
      <div style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: "40px",
            color: COLORS.darkGreen,
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          MAINTENANCE SCHEDULE
        </h2>
        <p style={{ fontStyle: "italic", fontSize: "18px", color: "#555", marginBottom: "40px" }}>
          The system requires two levels of maintenance: **routine checks** performed by farm personnel, and **less frequent, specialized checks** handled by certified technicians.
        </p>

        <div 
          style={{
            backgroundColor: COLORS.white,
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "sans-serif",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
              paddingBottom: "15px",
              borderBottom: `2px solid ${COLORS.lightGray}`,
              color: COLORS.darkText,
            }}
          >
            <div style={{ flex: 1, minWidth: "150px" }}>FREQUENCY</div>
            <div style={{ flex: 2, minWidth: "250px" }}>ACTIVITY</div>
            <div style={{ flex: 2, minWidth: "250px" }}>PURPOSE</div>
          </div>
          
          {[
            { freq: "Daily/Weekly (User)", act: "Check digester temperature and pH readings via the IoT Dashboard.", purp: "Confirm optimal conditions for microbial activity and early detection of fluctuations." },
            { freq: "Monthly (User)", act: "Inspect mixer, pumps, and pipe connections for leaks or blockages.", purp: "Prevent material build-up and ensure smooth flow of slurry." },
            { freq: "Quarterly (Technician)", act: "Calibrate key sensors (pH, temperature, gas composition).", purp: "Ensure accuracy of IoT data for reliable system optimization." },
            { freq: "Annually (Technician)", act: "Comprehensive internal cleaning and inspection of the digester tank.", purp: "Prevent sediment buildup and evaluate structural integrity." },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: index < 3 ? `1px dashed ${COLORS.lightGray}` : "none",
                fontSize: "16px",
                color: "#444",
              }}
            >
              <div style={{ flex: 1, minWidth: "150px", fontWeight: index < 2 ? "bold" : "normal" }}>{item.freq}</div>
              <div style={{ flex: 2, minWidth: "250px" }}>{item.act}</div>
              <div style={{ flex: 2, minWidth: "250px" }}>{item.purp}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3. SAFETY PARAMETERS & GUIDELINES (omitted for brevity) */}
      <div style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
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
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif" }}>
              <thead>
                <tr style={{ textAlign: "center", textTransform: "uppercase", fontSize: "14px" }}>
                  <th style={{ backgroundColor: COLORS.tableHeader, padding: "15px 10px", borderTopLeftRadius: "8px" }}>PARAMETER</th>
                  <th style={{ backgroundColor: COLORS.tableHeader, padding: "15px 10px" }}>SAFE</th>
                  <th style={{ backgroundColor: COLORS.tableHeader, padding: "15px 10px" }}>WARNING</th>
                  <th style={{ backgroundColor: COLORS.tableHeader, padding: "15px 10px" }}>DANGER</th>
                  <th style={{ backgroundColor: COLORS.tableHeader, padding: "15px 10px", borderTopRightRadius: "8px" }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: COLORS.tableLightRow }}>
                    <td style={{ padding: "15px 10px", fontWeight: "bold", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.param}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.safe}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.warning}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", borderRight: `1px solid ${COLORS.lightGray}` }}>{row.danger}</td>
                    <td style={{ padding: "15px 10px", textAlign: "center", backgroundColor: COLORS.tableGreenStatus, fontWeight: "bold", color: COLORS.darkText }}>{row.status}</td>
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