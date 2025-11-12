import React, { useState } from "react";
import Header from "../components/header";
import Slurry from "../database/Slurry";
import Retention from "../database/Retention";
import Temperature from "../database/Temperature";
import Storage from "../database/Storage";
import Ph from "../database/acidity";
import Alert from "../database/Alert";
import Table from "../database/Table";
import Gasses from "../database/gasses";

// IMPORT ALL GRAPH COMPONENTS (Using Corrected Names)
import RawGasGraph from "../Graphs/Raw-Gas-Graph";
import StoredGasGraph from "../Graphs/Stored-Gas-Graph";
import TempGraph from "../Graphs/Temperature_graph";
import PhGraph from "../Graphs/Ph-Level-Graph";
import DigesterGraph from "../Graphs/Digester-Graph";
import GasStorageGraph from "../Graphs/Gas-Storage-Graph"; 

// --- NEW CENTRALIZED FILTER COMPONENT ---
const GlobalTimeFilter = ({ filterPeriod, setFilterPeriod, selectedDate, setSelectedDate }) => {
    const filterOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
    const accentColor = "#6C8E3E"; // Green accent color

    return (
        <div style={{ 
            backgroundColor: '#F8F4E3', // Cream background from palette
            padding: '20px', 
            borderRadius: '8px', 
            margin: '20px 0',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h4 style={{ margin: 0, color: '#23320F' }}>View Data By:</h4>
            
            {/* 1. Period Dropdown */}
            <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    backgroundColor: accentColor,
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    appearance: 'none',
                }}
            >
                {filterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            {/* 2. Specific Date/Week Search/Input */}
            <input
                // Set input type to 'date' only when 'Daily' is selected for native picker
                type={filterPeriod === 'Daily' ? 'date' : 'text'} 
                placeholder={`Select a specific ${filterPeriod.toLowerCase()} (${filterPeriod === 'Daily' ? 'YYYY-MM-DD' : 'e.g., Week 45 / 2025-11'})`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    border: `1px solid ${accentColor}`,
                    fontSize: '14px',
                    flex: 1,
                    maxWidth: '300px',
                    color: '#23320F'
                }}
            />
        </div>
    );
};


export default function DashboardPage() {
    // *** NEW STATE: Global Filter States ***
    const [filterPeriod, setFilterPeriod] = useState('Weekly');
    const [selectedDate, setSelectedDate] = useState('');

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

      {/* --- GLOBAL FILTER UI --- */}
      <GlobalTimeFilter 
          filterPeriod={filterPeriod} 
          setFilterPeriod={setFilterPeriod}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
      />
      {/* ------------------------------- */}


      {/* 1. First Row: Four Summary Cards (Numeric components updated to accept filter props) */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        {/* All numeric cards now receive filter props */}
        <div style={{ flex: 1 }}><Slurry filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
        <div style={{ flex: 1 }}><Storage filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
        <div style={{ flex: 1 }}><Retention filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
        <div style={{ flex: 1 }}><Alert filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
      </div>
      
      {/* 2. Second Row: Three components (Temperature, Gasses, pH) */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div style={{ flex: 1 }}><Temperature filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
        <div style={{ flex: 2 }}><Gasses filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
        <div style={{ flex: 1 }}><Ph filterPeriod={filterPeriod} selectedDate={selectedDate} /></div>
      </div>

      {/* 3. Slurry Management Table (Full Width) */}
      <Table /> 

      {/* 4. Gas Quality Charts (Raw Gas and Storage Gas) - PASS GLOBAL FILTER PROPS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px" }}>
        <RawGasGraph filterPeriod={filterPeriod} selectedDate={selectedDate} /> 
        <StoredGasGraph filterPeriod={filterPeriod} selectedDate={selectedDate} />
      </div>

      {/* 5. Final Charts Row (Four small charts) - PASS GLOBAL FILTER PROPS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "40px", padding: '20px 0' }}>
        <TempGraph filterPeriod={filterPeriod} selectedDate={selectedDate} /> 
        <PhGraph filterPeriod={filterPeriod} selectedDate={selectedDate} />
        <GasStorageGraph filterPeriod={filterPeriod} selectedDate={selectedDate} />
        <DigesterGraph filterPeriod={filterPeriod} selectedDate={selectedDate} />
      </div>

    </div>
  );
}