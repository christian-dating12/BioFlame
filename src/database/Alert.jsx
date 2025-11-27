import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Helper function to define the time range (FIXED)
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

        return { 
            startTime: startTime.toISOString(), 
            endTime: endTime.toISOString() 
        };
    }

    // --- 2. Set the End Time based on the selectedDate (if provided) ---
    if (selectedDate && !selectedDate.includes('|')) {
        const dateParts = selectedDate.split('-'); 
        // Note: Months in JS Date are 0-indexed (Jan=0, Dec=11)
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
    
    return { 
        startTime: startTime.toISOString(), 
        endTime: endTime.toISOString() 
    };
};

export default function DataOverviewComponent({ filterPeriod, selectedDate }) {
  // Use state to hold the count of active alerts
  const [alertCount, setAlertCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // The value is displayed as an integer count, so we format it to 0 decimals.
  const formattedValue = alertCount.toFixed(0); 

  useEffect(() => {
    async function getAlertCount() {
      setLoading(true);
      setError(null);
      
      // MODIFIED: Pass selectedDate to get both start and end time boundaries
      const { startTime, endTime } = calculateTimeRange(filterPeriod, selectedDate);

      // Querying the 'alertlog' table for the count of alerts where status is 'New' within the period
      const { count, error } = await supabase
        .from('alertlog') // Targeting the alertlog table
        .select('*', { count: 'exact', head: true }) // Request exact count without fetching data
        .eq('status', 'New') // Filtering for alerts with the status 'New'
        .gte('timestamp', startTime) // Filter records greater than or equal to startTime
        .lt('timestamp', endTime); // CRITICAL FIX: Add upper bound to restrict history

      if (error) {
        console.error("Supabase Error fetching Alert Count:", error);
        setError("Failed to load alert data.");
        setAlertCount(0);
      } else {
        // If count is null, default to 0
        setAlertCount(count || 0); 
      }
      setLoading(false);
    }
    getAlertCount();
  }, [filterPeriod, selectedDate]); 


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
        Active Alerts
      </h3>
      
      {loading && <div style={{ color: "#6C8E3E" }}>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      
      {/* Container for the large number (Alert Count) */}
      <div
        style={{
          fontSize: "6em", 
          fontWeight: "bold",
          // Use Red if there are alerts, Green if zero
          color: alertCount > 0 ? "#A3362E" : "#6C8E3E", 
          lineHeight: "1.2",
        }}
      >
        {formattedValue}
      </div>

      {/* Optional: A label indicating what the number represents */}
      <p style={{ color: "#aaa", marginTop: "10px" }}>
        Current Issues ({filterPeriod})
      </p>
    </div>
  );
}

