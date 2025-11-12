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
        .from('sensorreading') // Targeting the sensorreading table
        .select('value, timestamp')
        .eq('sensor_id', TEMPERATURE_SENSOR_ID) // Filtering for the T-01 sensor
        .order('timestamp', { ascending: false }) // Ensures newest data is fetched first
        .limit(5); // Fetch top 5 records to skip potential NULL entries

      if (error) {
        console.error("Supabase Error fetching Temperature data:", error);
        setError("Data failed to load.");
        setDisplayValue(0);
      } else {
        // Find the first record with a non-null value for robustness
        const firstValidRecord = data.find(item => item.value !== null);

        // Extract the value, defaulting to 0 if no valid record is found
        const rawValue = firstValidRecord ? firstValidRecord.value : 0;
        
        // Explicitly parse the raw value as a float
        const latestValue = parseFloat(rawValue); 
        
        // Handle NaN/Invalid parse by falling back to 0
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
        marginTop: "40px",
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

      {/* Optional: A label indicating what the number represents */}
      <p style={{ color: "#aaa", marginTop: "10px" }}>
        Latest Recorded Value
      </p>
    </div>
  );
}