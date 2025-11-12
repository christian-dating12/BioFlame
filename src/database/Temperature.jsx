import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";   // or `import supabase from "../supabaseClient"`

const SENSOR_ID = "T-01";         // temperature sensor_id from your `sensor` table
const POINTS = 50;                // how many points to draw in the trend
const POLL_MS = 5000;             // 5s polling (works even without Realtime)

export default function Temperature() {
  const [latest, setLatest] = useState(null);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  async function loadLatest() {
    const { data, error } = await supabase
      .from("sensorreading")
      .select("value, unit, timestamp")
      .eq("sensor_id", SENSOR_ID)
      .order("timestamp", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return setErr(error.message);
    setLatest(data);
  }

  async function loadSeries() {
    const { data, error } = await supabase
      .from("sensorreading")
      .select("value, timestamp")
      .eq("sensor_id", SENSOR_ID)
      .order("timestamp", { ascending: false })
      .limit(POINTS);

    if (error) return setErr(error.message);
    // reverse for left→right time
    setSeries((data || []).reverse());
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadLatest(), loadSeries()]);
      setLoading(false);
    })();

    // simple polling so it updates even without Realtime enabled
    const t = setInterval(() => {
      loadLatest();
      loadSeries();
    }, POLL_MS);
    return () => clearInterval(t);
  }, []);

  if (loading) return <div>Loading temperature…</div>;
  if (err) return <div style={{ color: "tomato" }}>Error: {err}</div>;

  return (
    <div style={{ padding: 16, borderRadius: 8, background: "#111824", color: "#e5e7eb" }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>Temperature</h3>

      <div style={{ fontSize: 28, fontWeight: 700 }}>
        {latest ? `${latest.value.toFixed(2)} ${latest.unit || "°C"}` : "—"}
      </div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {latest ? new Date(latest.timestamp).toLocaleString() : ""}
      </div>

      {/* super-lightweight trend without extra libs */}
      <svg viewBox="0 0 400 120" style={{ width: "100%", marginTop: 12 }}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={(() => {
            if (!series.length) return "";
            const xs = series.map((_, i) => (i / (series.length - 1)) * 400);
            const vals = series.map(p => p.value);
            const min = Math.min(...vals);
            const max = Math.max(...vals);
            const norm = (v) => 100 - ((v - min) / (max - min || 1)) * 100 + 10; // 10..110
            return series.map((p, i) => `${xs[i]},${norm(p.value)}`).join(" ");
          })()}
        />
      </svg>
    </div>
  );
}
