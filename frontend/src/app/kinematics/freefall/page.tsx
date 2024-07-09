import dynamic from "next/dynamic";
import React from "react";

const FreeFallContainer = dynamic(
  () => import("@/app/kinematics/_components/freeFallContainer"),
  { ssr: false }
);

const FreeFall = () => {
  return (
    <>
      <section className="flex w-full flex-col py-20 items-center">
        <FreeFallContainer />
      </section>
    </>
  );
};

export default FreeFall;
