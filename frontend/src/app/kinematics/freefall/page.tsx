"use client";
import Graph from "@/components/graph";
import React, { useState } from "react";

const FreeFall = () => {
  const [xData, setXData] = useState("");
  const [xUnit, setXUnit] = useState("m");
  const [yData, setYData] = useState("");
  const [yUnit, setYUnit] = useState("m/s");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:8000/kinematics/api/freefall/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: xData,
          height_unit: xUnit,
          velocity: yData,
          velocity_unit: yUnit,
        }),
      }
    );
    const result = await response.json();
    setMessage(result.height);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="xData">X Data:</label>
          <input
            type="text"
            id="xData"
            value={xData}
            onChange={(e) => setXData(e.target.value)}
            required
          />
          <select
            id="xUnit"
            value={xUnit}
            onChange={(e) => setXUnit(e.target.value)}
          >
            <option value="m">m</option>
          </select>
        </div>
        <div>
          <label htmlFor="yData">Y Data:</label>
          <input
            type="text"
            id="yData"
            value={yData}
            onChange={(e) => setYData(e.target.value)}
            required
          />
          <select
            id="yUnit"
            value={yUnit}
            onChange={(e) => setYUnit(e.target.value)}
          >
            <option value="m/s">m/s</option>
            <option value="km/h">km/h</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FreeFall;
