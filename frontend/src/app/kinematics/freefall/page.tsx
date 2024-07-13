import dynamic from "next/dynamic";
import React from "react";

const FreeFallContainer = dynamic(
  () => import("@/app/kinematics/_components/freeFallContainer"),
  { ssr: false }
);

const FreeFall = () => {
  return (
    <>
      <section className="flex w-full h-auto flex-col pt-15 mt-[56px] items-center">
        <FreeFallContainer />
      </section>
    </>
  );
};

export default FreeFall;
