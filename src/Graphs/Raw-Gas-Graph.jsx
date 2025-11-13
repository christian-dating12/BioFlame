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

const RAW_CH4_ID = "CH4-DIG";
const RAW_CO2_ID = "CO2-DIG";

// ✅ Format readable time for X-axis
const formatTimeLabel = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ✅ Normalize timestamps (round to nearest second)
const normalizeTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  date.setMilliseconds(0); // round down to nearest second
  return date.toISOString();
};

export default function RawGasGraph({ filterPeriod, selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGraphData() {
      setLoading(true);
      setError(null);

      // ✅ Fetch CH4
      const { data: ch4Data, error: ch4Error } = await supabase
        .from("sensorreading")
        .select("sensor_id, value, timestamp")
        .eq("sensor_id", RAW_CH4_ID)
        .order("timestamp", { ascending: true })
        .limit(100);

      // ✅ Fetch CO2
      const { data: co2Data, error: co2Error } = await supabase
        .from("sensorreading")
        .select("sensor_id, value, timestamp")
        .eq("sensor_id", RAW_CO2_ID)
        .order("timestamp", { ascending: true })
        .limit(100);

      if (ch4Error || co2Error) {
        console.error("Supabase Error fetching Raw Gas data:", ch4Error || co2Error);
        setError("Failed to load raw gas graph data.");
        setLoading(false);
        return;
      }

      // ✅ Merge CH4 and CO2 data by normalized timestamp
      const mergedDataMap = new Map();

      [...(ch4Data || []), ...(co2Data || [])]
        .filter((item) => item.value !== null)
        .forEach((item) => {
          const normalizedTime = normalizeTimestamp(item.timestamp);
          const formattedTime = formatTimeLabel(normalizedTime);

          if (!mergedDataMap.has(normalizedTime)) {
            mergedDataMap.set(normalizedTime, { name: formattedTime, ch4: null, co2: null });
          }

          const entry = mergedDataMap.get(normalizedTime);
          if (item.sensor_id === RAW_CH4_ID) {
            entry.ch4 = parseFloat(item.value) || 0;
          } else if (item.sensor_id === RAW_CO2_ID) {
            entry.co2 = parseFloat(item.value) || 0;
          }
        });

      // ✅ Convert Map to sorted array
      let finalData = Array.from(mergedDataMap.entries())
        .map(([timestamp, entry]) => ({ ...entry, timestamp }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map(({ timestamp, ...rest }) => rest);

      // ✅ Duplicate single point for visibility
      if (finalData.length === 1) {
        const single = finalData[0];
        finalData = [
          single,
          { ...single, name: single.name + " (duplicate)" },
        ];
      }

      setData(finalData);
      setLoading(false);
    }

    fetchGraphData();
  }, [filterPeriod, selectedDate]);

  const graphData =
    data.length > 0 ? data : [{ name: "No Data", ch4: 0, co2: 0 }];

  return (
    <div
      style={{
        backgroundColor: "#23320F",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left", color: "white" }}>
          Raw Gas Quality Overview (Viewing: {filterPeriod})
        </h3>
      </div>

      {loading && (
        <div style={{ color: "#6C8E3E", textAlign: "center" }}>
          Loading graph...
        </div>
      )}
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      {!loading && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={graphData}
            margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />

            <XAxis
              dataKey="name"
              stroke="#ccc"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
              tickLine={false}
            />

            <YAxis
              stroke="#ccc"
              domain={[
                (dataMin) => Math.floor(dataMin - 5),
                (dataMax) => Math.ceil(dataMax + 5),
              ]}
              label={{
                value: "Percentage (%)",
                angle: -90,
                position: "insideLeft",
                fill: "#ccc",
                offset: 0,
              }}
              tickLine={false}
            />

            <Tooltip />
            <Legend />

            <Brush
              dataKey="name"
              height={25}
              stroke="#6C8E3E"
              fill="#2E3F24"
              y={250}
            />

            <Line
              type="linear"
              dataKey="ch4"
              stroke="#6C8E3E"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Methane (CH4)"
              isAnimationActive={false}
              connectNulls={true} // ✅ ensures continuous line even if minor gaps
            />

            <Line
              type="linear"
              dataKey="co2"
              stroke="#A3362E"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Carbon Dioxide (CO2)"
              isAnimationActive={false}
              connectNulls={true} // ✅ connect small gaps in CO₂ data
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
