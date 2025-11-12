import React, { useState, useEffect } from "react";
import { supabase} from "../supabaseClient";
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

const STORED_CH4_ID = 'CH4-STO'; 
const STORED_CO2_ID = 'CO2-STO'; 

const formatTimeLabel = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};

export default function StoredGasGraph({ filterPeriod, selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGraphData() {
      setLoading(true);
      setError(null);
      
      // Fetch CH4 data
      const { data: ch4Data, error: ch4Error } = await supabase
        .from('sensorreading') 
        .select('value, timestamp')
        .eq('sensor_id', STORED_CH4_ID) 
        .order('timestamp', { ascending: true })
        .limit(100);

      // Fetch CO2 data
      const { data: co2Data, error: co2Error } = await supabase
        .from('sensorreading') 
        .select('value, timestamp')
        .eq('sensor_id', STORED_CO2_ID) 
        .order('timestamp', { ascending: true })
        .limit(100);

      if (ch4Error || co2Error) {
        console.error("Supabase Error fetching Stored Gas data:", ch4Error || co2Error);
        setError("Failed to load stored gas graph data.");
      } else {
        // Merge CH4 and CO2 data based on timestamp
        const mergedDataMap = new Map();
        
        [...(ch4Data || []), ...(co2Data || [])]
            .filter(item => item.value !== null)
            .forEach(item => {
                const timeKey = item.timestamp;
                const formattedTime = formatTimeLabel(timeKey);
                
                if (!mergedDataMap.has(timeKey)) {
                    mergedDataMap.set(timeKey, { name: formattedTime, ch4: null, co2: null });
                }
                
                const entry = mergedDataMap.get(timeKey);
                if (item.sensor_id === STORED_CH4_ID) {
                    entry.ch4 = parseFloat(item.value) || 0;
                } else if (item.sensor_id === STORED_CO2_ID) {
                    entry.co2 = parseFloat(item.value) || 0;
                }
        });
        
        // Convert map values to array and sort by original timestamp (for safety)
        const finalData = Array.from(mergedDataMap.entries())
            .map(([timestamp, entry]) => ({ ...entry, timestamp }))
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map(({ timestamp, ...rest }) => rest);
            
        setData(finalData);
      }
      setLoading(false);
    }
    fetchGraphData();
  }, [filterPeriod, selectedDate]);


  const graphData = data.length > 0 ? data : [
      { name: "No Data", ch4: 0, co2: 0 },
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
          Stored Gas Quality Overview (Viewing: {filterPeriod})
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
            
            {/* Y-AXIS: Domain for gas percentages (0 to 100) */}
            <YAxis 
                stroke="#ccc" 
                domain={[0, 100]} 
                label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#ccc' }}
            />
            
            <Tooltip />
            <Legend />
            <Brush dataKey="name" height={30} stroke="#6C8E3E" fill="#2E3F24" />
            
            {/* CH4 Line (Green) */}
            <Line
              type="monotone"
              dataKey="ch4"
              stroke="#6C8E3E"
              strokeWidth={2}
              name="Methane (CH4)"
            />
            
            {/* CO2 Line (Red) */}
            <Line
              type="monotone"
              dataKey="co2"
              stroke="#A3362E"
              strokeWidth={2}
              name="Carbon Dioxide (CO2)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}