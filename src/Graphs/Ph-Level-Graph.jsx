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

const PH_SENSOR_ID = 'PH-01'; 

const formatTimeLabel = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};

export default function PhLevelGraph({ filterPeriod, selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGraphData() {
      setLoading(true);
      setError(null);
      
      const { data: fetchedData, error } = await supabase
        .from('sensorreading') 
        .select('value, timestamp')
        .eq('sensor_id', PH_SENSOR_ID) 
        .order('timestamp', { ascending: true }) 
        .limit(100); 

      if (error) {
        console.error("Supabase Error fetching pH Level Graph data:", error);
        setError("Failed to load graph data.");
      } else {
        const formattedData = fetchedData
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
  }, [filterPeriod, selectedDate]);


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
          pH Level Overview (Viewing: {filterPeriod})
        </h3>
      </div>
      
      {loading && <div style={{ color: "#6C8E3E", textAlign: 'center' }}>Loading graph...</div>}
      {error && <div style={{ color: "red", textAlign: 'center' }}>{error}</div>}
      
      {!loading && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            
            <XAxis 
                dataKey="name" 
                stroke="#ccc" 
                interval="preserveStartEnd" 
                angle={-30} 
                textAnchor="end" 
                height={50} 
            />
            
            {/* Y-AXIS: Fixed domain for pH values (6 to 8) */}
            <YAxis 
                stroke="#ccc" 
                domain={[6, 8]} 
                label={{ value: 'pH Level', angle: -90, position: 'insideLeft', fill: '#ccc' }}
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