import PageHeading from "@/components/ui/page-heading";
import React from "react";

const Heading = () => {
  return (
    <div className="py-20 max-w-[30rem] flex mx-auto flex-col w-full">
      <PageHeading
        title="Kinematics"
        description="The science of motion, where speed, displacement, and acceleration tell the story, leaving forces behind the scenes."
      ></PageHeading>
    </div>
  );
};

export default Heading;
