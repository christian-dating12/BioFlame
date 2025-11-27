import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

export default function WaterLevelComponent({ filterPeriod, selectedDate }) {
  const [totalWeight, setTotalWeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ⚙️ CONFIG: Set your tank's maximum capacity in KG here.
  // (e.g., if your tank holds 1000kg, put 1000).
  const MAX_CAPACITY_KG = 170; 

  useEffect(() => {
    // Function to calculate total weight from active table entries
    async function getSlurryLevel() {
      setLoading(true);
      setError(null);
      
      try {
        // Query the exact same data as your Table component
        const { data, error } = await supabase
          .from('slurrylog')
          .select('weight') 
          .eq('transact_type', 'IN')
          .not('release_date', 'is', null);

        if (error) {
          console.error("Supabase Error fetching Slurry Level:", error);
          setError("Failed to load level data.");
        } else {
          // Sum up all the weights
          const sum = data.reduce((acc, item) => acc + (parseFloat(item.weight) || 0), 0);
          setTotalWeight(sum);
        }
      } catch (e) {
        console.error("Fetch exception:", e);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    // 1. Fetch immediately on load
    getSlurryLevel();
    
    // 2. Listen for changes in the 'slurrylog' table (Real-time)
    const subscription = supabase
      .channel('slurry_level_updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'slurrylog' },
        () => {
            // When the table changes (add/edit/delete), re-fetch the sum
            getSlurryLevel(); 
        }
      )
      .subscribe();

    // Cleanup subscription when component unmounts
    return () => {
        supabase.removeChannel(subscription);
    };

  }, [filterPeriod, selectedDate]);

  // Calculate percentage based on the defined Max Capacity
  const percentageFull = Math.min(100, Math.max(0, (totalWeight / MAX_CAPACITY_KG) * 100));
  
  // Formatting
  const formattedValue = percentageFull.toFixed(1); 
  
  // Visual Alert: Red if very low (< 20%), Green otherwise.
  const statusColor = percentageFull < 20 ? "#A3362E" : "#6C8E3E";

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
      
      {!loading && !error && (
        <>
            {/* Large Percentage Display */}
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

            {/* Subtitle: Total Weight vs Capacity */}
            <p style={{ color: "#aaa", marginTop: "10px", textAlign: "center" }}>
                % Full ({totalWeight.toFixed(0)} kg / {MAX_CAPACITY_KG} kg)
            </p>
        </>
      )}
    </div>
  );
}