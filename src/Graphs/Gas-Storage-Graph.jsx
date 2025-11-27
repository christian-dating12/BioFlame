import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
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

const STORAGE_LEVEL_ID = 'US-01'; 

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

const formatTimeLabel = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};


export default function GasStorageGraph({ data, filterPeriod, selectedDate }) {
  const [graphData, setGraphData] = useState([]);
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
        .eq('sensor_id', STORAGE_LEVEL_ID) 
        .gte('timestamp', startTime) // Filter records greater than or equal to startTime
        .order('timestamp', { ascending: true }) 
        .limit(100); 

      if (error) {
        console.error("Supabase Error fetching Gas Storage Graph data:", error);
        setError("Failed to load graph data.");
      } else {
        const formattedData = fetchedData
            .filter(item => item.value !== null) 
            .map(item => ({
                name: formatTimeLabel(item.timestamp),
                value: parseFloat(item.value) || 0,
            }));
            
        setGraphData(formattedData);
      }
      setLoading(false);
    }
    fetchGraphData();
  }, [filterPeriod, selectedDate]); 


  const chartData = graphData.length > 0 ? graphData : [
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
          Gas Storage Overview (Viewing: {filterPeriod})
        </h3>
      </div>
      
      {loading && <div style={{ color: "#6C8E3E", textAlign: 'center' }}>Loading graph...</div>}
      {error && <div style={{ color: "red", textAlign: 'center' }}>{error}</div>}
      
      {!loading && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            
            <XAxis 
                dataKey="name" 
                stroke="#ccc" 
                interval="preserveStartEnd" 
                angle={-30} 
                textAnchor="end" 
                height={50} 
            />
            
            {/* Y-AXIS: Domain for Storage Percentage (0 to 100) */}
            <YAxis 
                stroke="#ccc" 
                domain={[0, 100]} 
                label={{ value: 'Level (%)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
            />
            
            <Tooltip />
            <Legend />
            <Brush dataKey="name" height={30} stroke="#6C8E3E" fill="#2E3F24" />
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