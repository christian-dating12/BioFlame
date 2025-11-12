import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Mapping confirmed sensor ID for Temperature (T-01)
const TEMPERATURE_SENSOR_ID = 'T-01'; 

export default function DataOverviewComponent({ filterPeriod }) {

  const [displayValue, setDisplayValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTemperature() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('sensorreading') 
        .select('value, timestamp')
        .eq('sensor_id', TEMPERATURE_SENSOR_ID) 
        .order('timestamp', { ascending: false }) 
        .limit(5); 

      if (error) {
        console.error("Supabase Error fetching Temperature data:", error);
        setError("Data failed to load.");
        setDisplayValue(0);
      } else {
        const firstValidRecord = data.find(item => item.value !== null);

        const rawValue = firstValidRecord ? firstValidRecord.value : 0;
        
        const latestValue = parseFloat(rawValue); 
        
        setDisplayValue(isNaN(latestValue) ? 0 : latestValue);
      }
      setLoading(false);
    }
    getTemperature();
    
  }, [filterPeriod]);

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
        Temperature
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

      {/* FIX 2: Added filterPeriod to the display text */}
      <p style={{ color: "#aaa", marginTop: "10px" }}>
        Latest Recorded Value ({filterPeriod})
      </p>
    </div>
  );
}