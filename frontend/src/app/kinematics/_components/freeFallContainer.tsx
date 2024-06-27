"use client";
import FreeFallForm from "@/app/kinematics/_components/freeFallForm";
import FreeFallPlot from "@/app/kinematics/_components/freeFallPlot";
import { GraphProps, TFreeFall } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FreeFallContainer = () => {
  const [plotData, setPlotData] = useState<GraphProps | null>(null);

  const handleFormSubmit = async (data: TFreeFall) => {
    try {
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

      // Controleer of de response niet ok is (statuscode buiten 200-299)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

      // Controleer of result.plot_dict aanwezig en correct geformatteerd is
      if (!result.plot_dict) {
        throw new Error("Invalid plot data received from server");
      }

      const parsedData: GraphProps = JSON.parse(result.plot_dict);

      // Controleer of de vereiste velden aanwezig zijn in parsedData
      if (!parsedData.data || !parsedData.layout) {
        throw new Error("Parsed plot data is missing required fields");
      }

      setPlotData(parsedData);
    } catch (error) {
      console.error("Error fetching plot data:", error);
      // Reset plotData to null if there's an error
      setPlotData(null);
      // Eventueel: Toon een gebruikersvriendelijke foutmelding
      alert("Failed to fetch plot data. Please try again.");
    }
  };

  return (
    <div>
      <FreeFallForm onSubmit={handleFormSubmit} />
      {plotData && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.0,
            delay: 0.5,
            ease: [0, 0.7, 0.2, 1.0],
          }}
        >
          <FreeFallPlot data={plotData.data} layout={plotData.layout} />
        </motion.div>
      )}
    </div>
  );
};

export default FreeFallContainer;
