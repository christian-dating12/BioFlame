import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush, 
} from "recharts";

// Mapping confirmed sensor ID for Temperature (T-01)
const TEMPERATURE_SENSOR_ID = 'T-01'; 

// Helper function to define the time range
const calculateTimeRange = (filterPeriod) => {
    const now = new Date();
    let startTime = new Date(now);

    switch (filterPeriod) {
        case 'Hourly':
            startTime.setHours(now.getHours( - 11));
        case 'Daily':
            startTime.setDate(now.getDate() - 1); // Last 24 hours
            break;
        case 'Weekly':
            startTime.setDate(now.getDate() - 7); // Last 7 days
            break;
        case 'Monthly':
            startTime.setMonth(now.getMonth() - 1); // Last 30 days
            break;
        case 'Yearly':
            startTime.setFullYear(now.getFullYear() - 1); // Last 365 days
            break;
        default:
            startTime.setDate(now.getDate() - 7); // Default to Weekly
    }
    return startTime.toISOString();
};

// Helper to format the timestamp for the X-axis (e.g., "11/11 02:10")
const formatTimeLabel = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    // Simple formatting for demonstration: Month/Day HH:MM
    return date.toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};


export default function TemperatureGraph({ filterPeriod, selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGraphData() {
      setLoading(true);
      setError(null);
      
      const startTime = calculateTimeRange(filterPeriod); // Calculate start time

      const { data: fetchedData, error } = await supabase
        .from('sensorreading') 
        .select('value, timestamp')
        .eq('sensor_id', TEMPERATURE_SENSOR_ID) 
        .gte('timestamp', startTime) // Filter records greater than or equal to startTime
        .order('timestamp', { ascending: true }) 
        .limit(100); 

      if (error) {
        console.error("Supabase Error fetching Temperature Graph data:", error);
        setError("Failed to load graph data.");
      } else {
        // Format data for Recharts: { name: timestamp_label, value: numeric_value }
        const formattedData = fetchedData
            // Ensure data is not null before mapping
            .filter(item => item.value !== null) 
            .map(item => ({
                name: formatTimeLabel(item.timestamp),
                value: parseFloat(item.value) || 0,
            }));
            
        setData(formattedData);
      }
      setLoading(false);
    }
    fetchGraphData();
    // Re-run fetch when filters change
  }, [filterPeriod, selectedDate]); 


  // Placeholder data if no data is returned or data is empty
  const graphData = data.length > 0 ? data : [
      { name: "No Data", value: 0 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#23320F",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px', 
      }}>
        <h3 style={{ margin: 0, textAlign: "left", color: 'white' }}>
          Temperature Overview (Viewing: {filterPeriod})
        </h3>
      </div>
      
      {loading && <div style={{ color: "#6C8E3E", textAlign: 'center' }}>Loading graph...</div>}
      {error && <div style={{ color: "red", textAlign: 'center' }}>{error}</div>}
      
      {!loading && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            
            {/* X-AXIS: Rotated labels for better time display */}
            <XAxis 
                dataKey="name" 
                stroke="#ccc" 
                interval="preserveStartEnd" // Only show labels that don't overlap
                angle={-30} // Rotate labels by -30 degrees
                textAnchor="end" // Anchor text to the end for better alignment
                height={50} // Increase height to accommodate rotated labels
            />
            
            {/* Y-AXIS: Fixed domain and label for Temperature in Celsius */}
            <YAxis 
                stroke="#ccc" 
                domain={[20, 70]} // Set domain from 20°C (low buffer) to 70°C (high buffer)
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
            />
            
            <Tooltip />
            <Legend />
            <Brush // Zoom/Pan component added
                dataKey="name" 
                height={30} 
                stroke="#6C8E3E" 
                fill="#2E3F24"  
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6C8E3E"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}