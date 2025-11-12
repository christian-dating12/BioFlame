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
} from "recharts";

export default function RawGas({ data }) {
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
        marginTop: "40px",
      }}
    >
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
        Raw Gas Quality Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
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
