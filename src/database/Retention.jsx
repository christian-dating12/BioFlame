import React from "react";

export default function DataOverviewComponent({ data, filterPeriod, selectedDate }) {
  // Determine the value to display.
  // We'll display the 'value' from the last item in the array,
  // or a default of 0 if the data is empty or invalid.
  const displayValue =
    data && data.length > 0
      ? data[data.length - 1].value
      : 0;

  // Function to format the number (optional: adding units or precision)
  const formattedValue = typeof displayValue === 'number' ? displayValue.toFixed(2) : displayValue;

  return (
    <div
      style={{
        backgroundColor: "#23320F",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "340px", 
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginBottom: "20px", textAlign: "center", color: "#ccc" }}>
        Retention
      </h3>
      
      {/* Container for the large number */}
      <div
        style={{
          fontSize: "6em", // Large font size for impact
          fontWeight: "bold",
          color: "#6C8E3E", // Use the original line stroke color for the number
          lineHeight: "1.2",
        }}
      >
        {formattedValue}
      </div>

      {/* Optional: A label indicating what the number represents */}
      <p style={{ color: "#aaa", marginTop: "10px" }}>
        Latest Recorded Value ({filterPeriod})
      </p>
    </div>
  );
}