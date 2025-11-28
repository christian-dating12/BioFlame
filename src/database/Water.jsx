import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 

// Helper function to define the time range (Required for Historical Balance calculation)
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

export default function WaterLevelComponent({ filterPeriod, selectedDate }) {
  const [totalWeight, setTotalWeight] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(170); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New function to create an alert
  const createSlurryAlert = async (percentage) => {
      // Check if alert condition is met (OVER 100%)
      if (percentage > 100) {
          const alertMessage = `CRITICAL: Digester Overfill Detected! Slurry level is ${percentage.toFixed(1)}%.`;
          
          // Check if an identical 'New' alert already exists to prevent spamming the table
          const { count } = await supabase
              .from('alertlog')
              .select('*', { count: 'exact', head: true })
              .eq('message', alertMessage)
              .eq('status', 'New');

          if (count === 0) {
              const { error } = await supabase
                  .from('alertlog')
                  .insert({
                      timestamp: new Date().toISOString(),
                      message: alertMessage,
                      severity: 'High',
                      status: 'New',
                      source_id: 'D-01' 
                  });
              if (error) console.error("Failed to create alert:", error);
          }
      }
  };

  const fetchMaxCapacity = async () => {
      const { data, error } = await supabase
          .from('digester')
          .select('max_capacity')
          .eq('digester_id', 'D-01')
          .single();

      if (error || !data || data.max_capacity === null) {
          console.error("Error fetching max capacity:", error);
          setMaxCapacity(1000); 
          return 1000;
      } else {
          // Use Math.max to prevent division by zero if capacity is somehow 0
          const capacity = Math.max(1, parseFloat(data.max_capacity));
          setMaxCapacity(capacity); 
          return capacity;
      }
  }

  useEffect(() => {
    // 1. Function to calculate HISTORICAL BALANCE and trigger alert
    async function getHistoricalSlurryBalance() {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch capacity first to ensure the alert calculation is accurate
        const currentMaxCapacity = await fetchMaxCapacity(); 

        const { endTime } = calculateTimeRange(filterPeriod, selectedDate);
        
        // --- 1. Fetch Inputs (All 'IN' transactions BEFORE endTime) ---
        const { data: inputData, error: inputError } = await supabase
          .from('slurrylog')
          .select('weight') 
          .eq('transact_type', 'IN')
          .lt('timestamp', endTime); 

        // --- 2. Fetch Outputs (All 'OUT' transactions BEFORE endTime) ---
        const { data: outputData, error: outputError } = await supabase
          .from('slurrylog')
          .select('weight') 
          .eq('transact_type', 'OUT') 
          .lt('timestamp', endTime); 

        if (inputError || outputError) {
          console.error("Supabase Error fetching Historical Slurry Balance:", inputError || outputError);
          setError("Failed to load historical balance data.");
          setTotalWeight(0);
          return; 
        } else {
          const inputSum = inputData.reduce((acc, item) => acc + (parseFloat(item.weight) || 0), 0);
          const outputSum = outputData.reduce((acc, item) => acc + (parseFloat(item.weight) || 0), 0);
          
          const balance = Math.max(0, inputSum - outputSum); 
          setTotalWeight(balance);

          // Trigger alert check immediately
          const rawPercentage = (balance / currentMaxCapacity) * 100;
          createSlurryAlert(rawPercentage);
        }
      } catch (e) {
        console.error("Fetch exception:", e);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    getHistoricalSlurryBalance();
    
    // The Active Alerts component (Alert.jsx) will automatically update when the alertlog changes.
  }, [filterPeriod, selectedDate]); 

  // Calculate percentage for display (capped at 100.0%)
  const percentageFull = Math.min(100, Math.max(0, (totalWeight / maxCapacity) * 100));
  
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
              % Full ({totalWeight.toFixed(0)} kg / {maxCapacity.toFixed(0)} kg)
          </p>
        </>
      )}
    </div>
  );
}