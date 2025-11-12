import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Assuming the retention time is stored in the 'digester' table
const DIGESTER_TABLE = 'digester'; 
const RETENTION_COLUMN = 'retention_time';

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