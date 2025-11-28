import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Assuming the retention time is stored in the 'digester' table
const DIGESTER_TABLE = 'digester'; 
const RETENTION_COLUMN = 'retention_time';

// Helper function to define the time range (included for consistency, though unused here)
const calculateTimeRange = (filterPeriod, selectedDate) => {
    // Current date/time for calculating backward periods, or if no date is provided.
    const now = new Date();
    let startTime = new Date(now);
    let endTime = new Date(now);
    
    // --- 1. Handle Hourly Filter (Highest Priority) ---
    if (filterPeriod === 'Hourly' && selectedDate && selectedDate.includes('|')) {
        const parts = selectedDate.split('|');
        const datePart = parts[0];
        const hour = parseInt(parts[1], 10); 
        startTime = new Date(`${datePart}T00:00:00Z`);
        startTime.setUTCHours(hour);
        endTime = new Date(startTime);
        endTime.setUTCHours(hour + 1);
        return { startTime: startTime.toISOString(), endTime: endTime.toISOString() };
    }

    // --- 2. Set the End Time based on the selectedDate (if provided) ---
    if (selectedDate && !selectedDate.includes('|')) {
        const dateParts = selectedDate.split('-'); 
        endTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 23, 59, 59, 999);
    } 

    // --- 3. Calculate the Start Time based on filterPeriod relative to endTime ---
    startTime = new Date(endTime); 
    switch (filterPeriod) {
        case 'Daily':
            startTime.setDate(startTime.getDate() - 1); 
            break;
        case 'Weekly':
            startTime.setDate(startTime.getDate() - 7); 
            break;
        case 'Monthly':
            startTime.setMonth(startTime.getMonth() - 1); 
            break;
        case 'Yearly':
            startTime.setFullYear(startTime.getFullYear() - 1); 
            break;
    }
    
    return { startTime: startTime.toISOString(), endTime: endTime.toISOString() };
};


export default function DataOverviewComponent({ data, filterPeriod, selectedDate }) {
  // Use state to hold the retention value
  const [displayValue, setDisplayValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRetentionTime() {
      setLoading(true);
      setError(null);
      
      // Fetching the retention_time from the 'digester' table
      const { data, error } = await supabase
        .from(DIGESTER_TABLE) 
        .select(RETENTION_COLUMN)
        .limit(1); // Assuming you only need the retention time from one record

      if (error) {
        console.error("Supabase Error fetching Retention data:", error);
        setError("Failed to load data.");
        setDisplayValue(0);
      } else {
        // Retrieve the value, defaulting to 0 if data is missing
        const rawValue = data && data.length > 0 ? data[0][RETENTION_COLUMN] : 0;
        const latestValue = parseFloat(rawValue); 
        
        setDisplayValue(isNaN(latestValue) ? 0 : latestValue);
      }
      setLoading(false);
    }
    getRetentionTime();
  }, [filterPeriod, selectedDate]);

  // Format the number to a whole number (integer) since retention time is 'int4'
  const formattedValue = displayValue.toFixed(0); 

  return (
    <div
      style={{
        backgroundColor: "#23320F",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "340px", 
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginBottom: "20px", textAlign: "center", color: "#ccc" }}>
        Retention (Days)
      </h3>
      
      {loading && <div style={{ color: "#6C8E3E" }}>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Container for the large number */}
      <div
        style={{
          fontSize: "6em", 
          fontWeight: "bold",
          color: "#6C8E3E", 
          lineHeight: "1.2",
        }}
      >
        {formattedValue}
      </div>

      {/* Optional: A label indicating what the number represents */}
      <p style={{ color: "#aaa", marginTop: "10px" }}>
        Latest Recorded Value ({filterPeriod})
      </p>
    </div>
  );
}