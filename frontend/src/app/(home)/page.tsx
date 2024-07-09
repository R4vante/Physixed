import Benefits from "@/app/(home)/_components/benefits";
import Hero from "@/app/(home)/_components/hero";
import Contact from "@/app/(home)/_components/contact";
import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col">
      <Hero />
      <Benefits />
      <Contact />
    </section>
  );
};

export default Home;
