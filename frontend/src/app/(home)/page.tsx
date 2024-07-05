import Benefits from "@/app/(home)/_components/Benefits";
import Hero from "@/app/(home)/_components/Hero";
import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col">
      <Hero />
      <Benefits />
    </section>
  );
};

export default Home;
