import FreeFallPlot from "@/app/kinematics/_components/freeFallPlot";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/cardWrapper";
import { GraphProps } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

const HeightPlot = ({
  heightData,
  isVelocity,
  setIsVelocity,
  isFirstRender,
  setIsFirstRender,
}: HeightPlotProps) => {
  useEffect(() => {
    setIsFirstRender(false);
  }, [setIsFirstRender]);
  return (
    <motion.div
      key="heightPlot"
      className="mt-4 w-full h-full flex-grow"
      initial={
        isFirstRender ? { opacity: 0, scale: 1 } : { opacity: 0, rotateY: 90 }
      }
      animate={
        isFirstRender ? { opacity: 1, scale: 2 } : { opacity: 1, rotateY: 0 }
      }
      exit={{ opacity: 0, rotateY: -90 }}
      transition={
        isFirstRender
          ? {
              duration: 1.0,
              delay: 0.5,
              ease: [0, 0.7, 0.2, 1.0],
            }
          : {
              duration: 0.5,
            }
      }
    >
      <CardWrapper className="flex flex-col">
        <FreeFallPlot
          className="flex justify-center w-full h-full"
          data={heightData.data}
          layout={heightData.layout}
        />
        <div className="w-full flex justify-end">
          <Button
            variant="link"
            className="text-primary"
            onClick={() => setIsVelocity(!isVelocity)}
          >
            Plot Velocity
          </Button>
        </div>
      </CardWrapper>
    </motion.div>
  );
};

export default HeightPlot;

type HeightPlotProps = {
  heightData: GraphProps;
  isVelocity: boolean;
  setIsVelocity: (value: boolean) => void;
  isFirstRender: boolean;
  setIsFirstRender: (value: boolean) => void;
};
