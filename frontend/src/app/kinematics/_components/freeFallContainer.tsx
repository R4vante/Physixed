"use client";
import FreeFallForm from "@/app/kinematics/_components/freeFallForm";
import { GraphProps, TFreeFall } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardWrapper from "@/components/ui/cardWrapper";
import toast from "react-hot-toast";
import Plot from "@/app/kinematics/_components/plot";

const FreeFallContainer = () => {
  const baseUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL;
  const [heightData, setHeightData] = useState<GraphProps | null>(null);
  const [velocityData, setVelocityData] = useState<GraphProps | null>(null);
  const [isVelocity, setIsVelocity] = useState(false);

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

      if (!result.height_dict) {
        throw new Error("Could not receive height data from server.");
      }
      if (!result.velocity_dict) {
        throw new Error("Could not receive velocity data from server.");
      }

      const parsedHeightData: GraphProps = JSON.parse(result.height_dict);

      const parsedVelocityData: GraphProps = JSON.parse(result.velocity_dict);

      if (!parsedHeightData.data || !parsedHeightData.layout) {
        throw new Error("Parsed plot data is missing required fields");
      }

      setHeightData(parsedHeightData);
      setVelocityData(parsedVelocityData);
    } catch (error) {
      console.error("Error fetching plot data:", error);
      setHeightData(null);
      setVelocityData(null);
      toast.error("Failed to fetch plot data. Please try again.");
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
        {heightData && velocityData && (
          <AnimatePresence mode="wait">
            {isVelocity ? (
              <motion.div
                key={isVelocity ? "velocity" : "height"}
                className="mt-4 w-full h-full flex-grow"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{
                  duration: 0.5,
                }}
              >
                <Plot
                  data={velocityData}
                  isVelocity={isVelocity}
                  setIsVelocity={setIsVelocity}
                  buttonTitle="Plot Velocity"
                />
              </motion.div>
            ) : (
              <motion.div
                key={isVelocity ? "velocity" : "height"}
                className="mt-4 w-full h-full flex-grow"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{
                  duration: 0.5,
                }}
              >
                <Plot
                  data={heightData}
                  isVelocity={isVelocity}
                  setIsVelocity={setIsVelocity}
                  buttonTitle="Plot Velocity"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default FreeFallContainer;
