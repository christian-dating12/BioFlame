import React from "react";
import { palette } from "../theme/palette";

export default function PalettePreview() {
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
      {Object.entries(palette).map(([name, color]) => (
        <div
          key={name}
          style={{
            background: color,
            color: name === "cream" ? "#222" : "#fff",
            padding: 20,
            borderRadius: 12,
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {name.toUpperCase()} <br /> {color}
        </div>
      ))}
    </div>
  );
}
