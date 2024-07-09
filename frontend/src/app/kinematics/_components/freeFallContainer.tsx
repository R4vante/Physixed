"use client";
import FreeFallForm from "@/app/kinematics/_components/freeFallForm";
import { GraphProps, TFreeFall } from "@/lib/types";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import FreeFallPlot from "@/app/kinematics/_components/freeFallPlot";
import CardWrapper from "@/components/ui/cardWrapper";

const FreeFallContainer = () => {
  const baseUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL;
  const [plotData, setPlotData] = useState<GraphProps | null>(null);

  const handleFormSubmit = async (data: TFreeFall) => {
    try {
      const response = await fetch(`${baseUrl}/kinematics/freefall/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.plot_dict) {
        throw new Error("Invalid plot data received from server");
      }

      const parsedData: GraphProps = JSON.parse(result.plot_dict);

      if (!parsedData.data || !parsedData.layout) {
        throw new Error("Parsed plot data is missing required fields");
      }

      setPlotData(parsedData);
    } catch (error) {
      console.error("Error fetching plot data:", error);
      setPlotData(null);
      alert("Failed to fetch plot data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-between md:justify-between lg:flex-row lg:justify-between lg:h-full lg:w-3/4 lg:gap-x-10">
      <CardWrapper
        className="flex flex-col justify-self-start align-top items-center p-4 md:p-6 lg:w-1/2"
        title="FreeFall"
        label="Fill in your initial height and velocity here!"
      >
        <FreeFallForm onSubmit={handleFormSubmit} />
      </CardWrapper>

      <div className="flex flex-col items-center w-full lg:w-1/2">
        {plotData && (
          <motion.div
            className="mt-4 w-full h-full flex-grow"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.5,
              ease: [0, 0.7, 0.2, 1.0],
            }}
          >
            <CardWrapper className="w-full h-full">
              <FreeFallPlot
                className="flex justify-center w-full h-full"
                data={plotData.data}
                layout={plotData.layout}
              />
            </CardWrapper>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FreeFallContainer;
