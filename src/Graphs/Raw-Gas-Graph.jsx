import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush, // Added for zoom
} from "recharts";

export default function RawGasGraph({ data, filterPeriod, selectedDate }) {
  // If no data is passed, show placeholder data
  const sampleData =
    data && data.length > 0
      ? data
      : [
          { name: "Jan", value: 0 },
          { name: "Feb", value: 0 },
          { name: "Mar", value: 0 },
          { name: "Apr", value: 0 },
          { name: "May", value: 0 },
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
          Raw Gas Quality Overview (Viewing: {filterPeriod})
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
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
    </div>
  );
}