import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Mapping confirmed sensor ID for pH Level
const PH_SENSOR_ID = 'PH-01'; 

export default function DataOverviewComponent({ filterPeriod, selectedDate }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPhLevel() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('sensorreading') // Targeting the sensorreading table
        .select('value, timestamp')
        .eq('sensor_id', PH_SENSOR_ID) // Filtering for the PH-01 sensor
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Supabase Error fetching pH Level data:", error);
        setError("Data failed to load.");
        setDisplayValue(0);
      } else {
        // Find the latest value and explicitly parse it as a float
        const rawValue = data && data.length > 0 ? data[0].value : 0;
        const latestValue = parseFloat(rawValue); 
        
        // Handle NaN/Invalid parse by falling back to 0
        setDisplayValue(isNaN(latestValue) ? 0 : latestValue);
      }
      setLoading(false);
    }
    getPhLevel();
  }, [filterPeriod, selectedDate]);

  // Function to format the number
  const formattedValue = typeof displayValue === 'number' ? displayValue.toFixed(2) : displayValue;

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
        pH Level
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