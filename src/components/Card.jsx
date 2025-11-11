import React from "react";

export default function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: 20,
        borderRadius: 12,
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {title} <br /> {value}
    </div>
  );
}
