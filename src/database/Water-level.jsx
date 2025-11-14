import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// --- Component Definition ---

export default function WaterLevelComponent({ filterPeriod, selectedDate }) {
  // State to hold the fetched water level value (distance in cm or percentage)
  const [waterLevelDistance, setWaterLevelDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Assuming the raw reading is distance (e.g., in cm). 
  // We can calculate the percentage full if we know the tank depth.
  const TANK_DEPTH_CM = 150; // Example: Assume 150 cm deep tank
  
  // Calculate percentage full based on distance from top
  const percentageFull = waterLevelDistance !== null
    ? Math.max(0, Math.min(100, (1 - (waterLevelDistance / TANK_DEPTH_CM)) * 100))
    : null;

  // Value is displayed as a percentage, formatted to 1 decimal place.
  const formattedValue = percentageFull !== null ? percentageFull.toFixed(1) : '—'; 
  const statusColor = percentageFull !== null && percentageFull < 20 ? "#A3362E" : "#6C8E3E"; // Red if very low, Green otherwise

  useEffect(() => {
    async function getWaterLevel() {
      setLoading(true);
      setError(null);
      
      try {
        // Querying the 'sensorreading' table for the latest ultrasonic reading (US-01)
        const { data, error } = await supabase
          .from('sensorreading') // Targeting the sensorreading table
          .select('value') 
          .eq('sensor_id', 'US-01') // Filtering for the Ultrasonic Sensor ID
          .order('timestamp', { ascending: false }) // Get the latest reading
          .limit(1)
          .single(); // Expect a single row

        if (error) {
          console.error("Supabase Error fetching Water Level:", error);
          setError("Failed to load level data.");
          setWaterLevelDistance(null);
        } else if (data && data.value !== undefined) {
          // Assuming 'value' is the distance measurement in cm
          setWaterLevelDistance(data.value); 
        } else {
            // Handle case where no data is returned
            setWaterLevelDistance(null);
            setError("No data available for US-01.");
        }
      } catch (e) {
        console.error("Fetch exception:", e);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }
    getWaterLevel();
    
    // Optional: Set up real-time subscription for live updates (requires RLS policy configuration)
    // The following code is commented out as it requires proper RLS setup.
    /*
    const subscription = supabase
      .channel('water_level_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensorreading', filter: `sensor_id=eq.US-01` },
        (payload) => {
            if (payload.new.value !== undefined) {
                setWaterLevelDistance(payload.new.value);
            }
        }
      )
      .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
    */
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
        Digester Slurry Level
      </h3>
      
      {loading && <div style={{ color: "#6C8E3E" }}>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      
      {/* Container for the large percentage number */}
      <div
        style={{
          fontSize: "6em", 
          fontWeight: "bold",
          color: statusColor, 
          lineHeight: "1.2",
        }}
      >
        {formattedValue}
      </div>

      {/* Label indicating percentage and raw distance */}
      <p style={{ color: "#aaa", marginTop: "10px", textAlign: "center" }}>
        % Full ({waterLevelDistance !== null ? `${waterLevelDistance.toFixed(0)} cm remaining` : 'No reading'})
      </p>
    </div>
  );
}