import BenefitCards from "@/app/(home)/_components/ui/BenefitCards";
import TimelineIcon from "@mui/icons-material/Timeline";
import React from "react";

const Benefits = () => {
  return (
    <section className=" bg-[#f7f5fe] dark:bg-[#1f2023] py-12 lg:py-24 flex flex-col items-center gap-y-32 lg:flex-row lg:justify-around">
      <div className="flex items-center justify-between">
        <BenefitCards
          logo={<TimelineIcon className="size-32 text-primary" />}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
      <div className="flex items-center justify-between">
        <BenefitCards
          logo={<TimelineIcon className="size-32 text-primary" />}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
      <div className="flex items-center justify-between">
        <BenefitCards
          logo={<TimelineIcon className="size-32 text-primary" />}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
    </section>
  );
};

export default Benefits;
