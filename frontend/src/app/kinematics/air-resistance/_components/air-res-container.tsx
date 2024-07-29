import AirResForm from "@/app/kinematics/air-resistance/_components/air-res-form";
import CardWrapper from "@/components/ui/cardWrapper";
import React from "react";

const AirResContainer = () => {
  return (
    <div className="flex flex-col h-full items-center justify-between md:justify-between lg:flex-row lg:justify-between lg:h-full lg:w-3/4 lg:gap-x-10">
      <CardWrapper
        className="flex flex-col justify-self-start align-top items-center p-4 md:p-6 lg:w-1/2"
        title="Fall with Air Resistance"
        label="Fill in the parameters here!"
      >
        <AirResForm />
      </CardWrapper>
    </div>
  );
};

export default AirResContainer;
