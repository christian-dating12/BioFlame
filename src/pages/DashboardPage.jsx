import React from "react";
import Header from "../components/header";
import LineChartComponent from "../components/LineChartComponent";
import Slurry from "../database/Slurry";
import Retention from "../database/Slurry";

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <h2 style={{ color: "#fff", marginTop: 20 }}>Dashboard Page</h2>
    <LineChartComponent /> //placeholder
    <Slurry />
    <Retention/>

    </div>
  );
}
