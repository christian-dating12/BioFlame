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

import GlobalTimeFilter from "../components/GlobalTimeFilter";

// IMPORT ALL GRAPH COMPONENTS (Using Corrected Names)
import RawGasGraph from "../Graphs/Raw-Gas-Graph";
import StoredGasGraph from "../Graphs/Stored-Gas-Graph";
import TempGraph from "../Graphs/Temperature_graph";
import PhGraph from "../Graphs/Ph-Level-Graph";
import DigesterGraph from "../Graphs/Digester-Graph";
import GasStorageGraph from "../Graphs/Gas-Storage-Graph"; 


export default function DashboardPage() {
    // *** NEW STATE: Independent Filter States for Numeric/Summary Data ***
    const [numericFilterPeriod, setNumericFilterPeriod] = useState('Weekly');
    const [numericSelectedDate, setNumericSelectedDate] = useState('');

    // *** NEW STATE: Independent Filter States for Line Graphs ***
    const [graphFilterPeriod, setGraphFilterPeriod] = useState('Weekly');
    const [graphSelectedDate, setGraphSelectedDate] = useState('');

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

      {/* --- FILTER 1: FOR NUMERIC/SUMMARY DATA (TOP SECTION) --- */}
      <GlobalTimeFilter 
          filterPeriod={numericFilterPeriod} 
          setFilterPeriod={setNumericFilterPeriod}
          selectedDate={numericSelectedDate}
          setSelectedDate={setNumericSelectedDate}
      />
      {/* -------------------------------------------------------- */}


      {/* 1. First Row: Four Summary Cards (Numeric components) */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        {/* All numeric cards receive NUMERIC filter props */}
        <div style={{ flex: 1 }}><Slurry filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
        <div style={{ flex: 1 }}><Storage filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
        <div style={{ flex: 1 }}><Retention filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
        <div style={{ flex: 1 }}><Alert filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
      </div>
      
      {/* 2. Second Row: Three components (Gas Quality, etc.) */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div style={{ flex: 1 }}><Temperature filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
        <div style={{ flex: 2 }}><Gasses filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
        <div style={{ flex: 1 }}><Ph filterPeriod={numericFilterPeriod} selectedDate={numericSelectedDate} /></div>
      </div>

      {/* 3. Slurry Management Table */}
      <Table /> 

      {/* --- FILTER 2: FOR LINE TREND GRAPHS (BEFORE LINE TRENDS) --- */}
      <GlobalTimeFilter 
          filterPeriod={graphFilterPeriod} 
          setFilterPeriod={setGraphFilterPeriod}
          selectedDate={graphSelectedDate}
          setSelectedDate={setGraphSelectedDate}
      />
      {/* -------------------------------------------------------- */}


      {/* 4. Gas Quality Charts (Line Trend components) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px" }}>
        {/* Line graphs receive GRAPH filter props */}
        <RawGasGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} /> 
        <StoredGasGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} />
      </div>

      {/* 5. Final Charts Row (Line Trend components) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginTop: "40px", padding: '20px 0' }}>
        {/* Line graphs receive GRAPH filter props */}
        <TempGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} /> 
        <PhGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} />
        <GasStorageGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} />
        <DigesterGraph filterPeriod={graphFilterPeriod} selectedDate={graphSelectedDate} />
      </div>

    </div>
  );
}