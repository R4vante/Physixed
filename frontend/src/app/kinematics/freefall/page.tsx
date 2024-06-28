import dynamic from "next/dynamic";
import React from "react";

const FreeFallContainer = dynamic(
  () => import("@/app/kinematics/_components/freeFallContainer"),
  { ssr: false }
);

const FreeFall = () => {
  return (
    <>
      <section className="flex w-full space-between flex-col items-center">
        <h1>Kinematics</h1>
        <FreeFallContainer />
      </section>
    </>
  );
};

export default FreeFall;
