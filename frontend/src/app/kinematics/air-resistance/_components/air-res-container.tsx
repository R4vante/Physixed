"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AirResForm from "@/app/kinematics/air-resistance/_components/air-res-form";
import CardWrapper from "@/components/ui/cardWrapper";
import { GraphProps, TAirResistance } from "@/lib/types";
import { fetchData } from "@/lib/helpers";
import PlotContainer from "@/app/kinematics/_components/plot-container";

const AirResContainer = () => {
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
  const [heightData, setHeightData] = useState<GraphProps | null>(null);
  const [velocityData, setVelocityData] = useState<GraphProps | null>(null);
  const [isVelocity, setIsVelocity] = useState(false);

  const handleFormSubmit = async (data: TAirResistance) => {
    const result = await fetchData(
      data,
      `${baseURL}/kinematics/air-resistance/`
    );

    if (!result.height_dict) {
      throw new Error("Could not receive height data from server.");
    } else if (!result.velocity_dict) {
      throw new Error("Could not receive velocity data from server.");
    }

    setHeightData(JSON.parse(result.height_dict));
    setVelocityData(JSON.parse(result.velocity_dict));
  };

  return (
    <div className="flex flex-col h-full items-center justify-between md:justify-between lg:flex-row lg:justify-between lg:h-full lg:w-3/4 lg:gap-x-10">
      <CardWrapper
        className="flex flex-col justify-self-start align-top items-center p-4 md:p-6 lg:w-1/2"
        title="Fall with Air Resistance"
        label="Fill in the parameters here!"
      >
        <AirResForm onSubmit={handleFormSubmit} />
      </CardWrapper>

      <div className="flex flex-col items-center w-full lg:w-1/2">
        {heightData && velocityData && (
          <motion.div
            className="mt-4 w-full h-full flex-grow"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <PlotContainer
              data={isVelocity ? velocityData : heightData}
              isVelocity={isVelocity}
              setIsVelocity={setIsVelocity}
              buttonTitle="Plot Velocity"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AirResContainer;
