import HeroCards from "@/app/(home)/_components/HeroCards";
import "../index.css";
import Image from "next/image";
import BlackHoleImg from "@/assets/blackhole.jpeg";

const Hero = () => {
  return (
    <>
      <section className="relative container grid lg:grid-cols-2 place-items-center py-20 md:py-16 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <section className="text-5xl md:text-6xl font-bold">
            <h1 className="inline text-5xl md:text-6xl">
              Discover{" "}
              <span className="inline bg-gradient-to-r from-[#96eaf5]  to-[#47cdd2] text-transparent bg-clip-text">
                physics
              </span>{" "}
              in an interactive way with{" "}
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Physixed
              </span>
              !
            </h1>
          </section>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Explore intuitive models and simulations that make learning physics
            exciting and easy.
          </p>
        </div>

        <div className="animation-bg"></div>
      </section>
    </>
  );
};

export default Hero;
