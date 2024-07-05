import Benefits from "@/app/(home)/_components/Benefits";
import Hero from "@/app/(home)/_components/Hero";
import Contact from "@/app/(home)/_components/ContactForm";
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
