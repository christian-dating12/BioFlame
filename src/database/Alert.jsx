import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

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
      
      // Querying the 'alertlog' table for the count of alerts where status is 'New'
      const { count, error } = await supabase
        .from('alertlog') // Targeting the alertlog table
        .select('*', { count: 'exact', head: true }) // Request exact count without fetching data
        .eq('status', 'New'); // Filtering for alerts with the status 'New'

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