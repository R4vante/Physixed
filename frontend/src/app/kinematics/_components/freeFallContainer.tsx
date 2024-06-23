"use client";
import FreeFallForm from "@/app/kinematics/_components/freeFallForm";
import FreeFallPlot from "@/app/kinematics/_components/freeFallPlot";
import { GraphProps } from "@/lib/types";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";

const FreeFallContainer = () => {
  const [plotData, setPlotData] = useState<GraphProps | null>(null);

  const handleFormSubmit = async (data: FieldValues) => {
    const response = await fetch(
      "http://localhost:8000/kinematics/api/freefall/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    setPlotData(JSON.parse(result.plot_dict));
  };
  return (
    <div>
      <FreeFallForm onSubmit={handleFormSubmit} />
      {plotData && (
        <div className="w-full">
          <FreeFallPlot data={plotData.data} layout={plotData.layout} />
        </div>
      )}
    </div>
  );
};

export default FreeFallContainer;
