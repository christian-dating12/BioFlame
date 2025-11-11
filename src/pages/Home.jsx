import React from "react";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div
        style={{
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // move content higher
          textAlign: "center",
          paddingTop: "20px", // adjust this value to move it higher or lower
        }}
      >
        <h1
          style={{
            fontStyle: "italic",
            color: "#23320F",
            fontSize: 70,
            fontFamily: "'Sorts Mill Goudy', serif",
          }}
        >
          Farming Meets Future Tech
        </h1>
      </div>
    </div>
  );
}
