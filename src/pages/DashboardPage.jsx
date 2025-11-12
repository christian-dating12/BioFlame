import React from "react";
import Header from "../components/header";
import LineChartComponent from "../Graphs/Stored-Gas-Graph";
import Slurry from "../database/Slurry";
import Retention from "../database/Retention";
import Temperature from "../database/Temperature";
import Storage from "../database/Storage";
import Ph from "../database/acidity";
import Alert from "../database/Alert";
import Table from "../database/Table";
import Gasses from "../database/gasses";

// Reusable dark-themed chart placeholder for the final bottom row
const ChartPlaceholder = ({ title }) => (
    <div 
      style={{ 
        backgroundColor: "#23320F", 
        borderRadius: "12px", 
        padding: "20px", 
        color: "white", 
        height: "200px", // Reduced height to fit the screenshot's smaller bottom charts
        display: "flex", 
        flexDirection: 'column',
        alignItems: "center", 
        justifyContent: "center",
        
      }}
    >
        <h3 style={{ color: "#ccc", margin: '0 0 10px 0' }}>{title}</h3>
        {/* Placeholder for the chart visualization */}
        <div style={{ width: '80%', height: '100px', border: '1px dashed #6C8E3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
            [Chart Area]
        </div>
    </div>
);


export default function DashboardPage() {
  return (
    // Outer container for the whole dashboard: Light gray body background, full width.
    <div style={{ width: "100%", margin: '0 auto', color: '#333', backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
      <Header />
      
      {/* Dark Header/Title Bar Placeholder (Matching the screenshot) */}
      <div style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'normal' }}>DASHBOARD</h1>
        {/* Navigation/Menu placeholder here if necessary */}
      </div>

      {/* 1. First Row: Four Summary Cards (Slurry, Storage, Retention, Alert) */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        {/* Note: Components have internal top margin, removed here for tight fit */}
        <div style={{ flex: 1 }}><Slurry /></div>
        <div style={{ flex: 1 }}><Storage /></div>
        <div style={{ flex: 1 }}><Retention /></div>
        <div style={{ flex: 1 }}><Alert /></div>
      </div>
      
      {/* 2. Second Row: Three components (Temperature, Gasses, pH) */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div style={{ flex: 1 }}><Temperature /></div>
        {/* Gas Quality is full width to fit both the bar chart and ratio text */}
        <div style={{ flex: 2 }}><Gasses /></div>
        <div style={{ flex: 1 }}><Ph /></div>
      </div>

      {/* 3. Slurry Management Table (Full Width) */}
      <Table />

      {/* 4. Gas Quality Charts (Raw Gas and Storage Gas) - Placed directly below the table */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px" }}>
        {/* Using the LineChartComponent for raw data visualization as per Time.png's lower section */}
        <LineChartComponent title="Raw Gas Quality" /> 
        <LineChartComponent title="Storage Gas Quality" />
      </div>

      {/* 5. Final Charts Row (Four small charts) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "40px", padding: '20px 0' }}>
        <LineChartComponent title="Temperature" /> 
        <LineChartComponent title="pH Level" />
        <LineChartComponent title="Gas Storage" />
        <LineChartComponent title="Digester" />
      </div>

    </div>
  );
}