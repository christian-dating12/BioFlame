import React from "react";
import Header from "../components/header";
import Footer from "../components/footer"; 
import maintenanceImage from "../assets/maintenance-bg.png";

const COLORS = {
// ... (COLORS definitions remain the same)
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

// ... (IoTBox component omitted for brevity) ...


export default function Maintenance() {
  
    const tableData = [
        { param: "TEMPERATURE", safe: "25-40C", warning: "50-60C", danger: ">60C", status: "SAFE" },
        { param: "PH LEVEL", safe: "6-7.4", warning: "6.4-6.6", danger: "<6.4", status: "SAFE" },
        { param: "WATER LEVEL", safe: "WATER LEVEL", warning: "WATER LEVEL", danger: "WATER LEVEL", status: "SAFE" },
        { param: "METHANE %", safe: "50-70%", warning: "<50%", danger: "<60%", status: "SAFE" },
        { param: "CARBON DIOXIDE %", safe: "30-45%", warning: "<45%", danger: "<60%", status: "SAFE" },
    ];
    
  return (
    <div style={{ backgroundColor: COLORS.lightGray }}> {/* Main page background */}
      <Header />
      
      {/* 1. Hero Section (Image Placeholder) */}
      {/* ... (Hero section content omitted) ... */}
      
      {/* 2. MAINTENANCE SCHEDULE (omitted for brevity) */}
      {/* ... (Maintenance schedule content omitted) ... */}
      
      {/* 3. SAFETY PARAMETERS & GUIDELINES (Table Section) */}
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
            <table 
              style={{ 
                width: "100%", 
                borderCollapse: "collapse", 
                fontFamily: "sans-serif", 
                color: "#000" // ADDED: Forces all text in the table to black
              }}
            >
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
                    <td style={{ padding: "15px 10px", textAlign: "center", backgroundColor: COLORS.tableGreenStatus, fontWeight: "bold", color: "#000" }}>{row.status}</td> {/* UPDATED: Forces status text to black */}
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