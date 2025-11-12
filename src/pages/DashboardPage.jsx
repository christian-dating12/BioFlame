import React from "react";
import Header from "../components/header";
import LineChartComponent from "../components/LineChartComponent";
import Slurry from "../database/Slurry";
import Retention from "../database/Retention";
import Temperature from "../database/Temperature";
import Storage from "../database/Storage";
import Ph from "../database/acidity";
import Alert from "../database/Alert";
import Table from "../database/Table";





export default function DashboardPage() {
  return (
    <div>
      <Header />
      <h2 style={{ color: "#fff", marginTop: 20 }}>Dashboard Page</h2>
    <LineChartComponent /> //placeholder
    <Slurry />
    <Retention/>
    <Temperature />
    <Storage />
    <Ph />
    <Alert />
    <Table />

    </div>
  );
}
