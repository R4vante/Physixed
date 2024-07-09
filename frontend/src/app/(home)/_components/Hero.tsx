import HeroCards from "@/app/(home)/_components/heroImage";
import "../index.css";
import HeroImage from "@/app/(home)/_components/heroImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="relative h-[100vh] container grid lg:grid-cols-2 place-items-center py-20 md:py-16 xl:w-full gap-10 sm:px-7 md:px-12 lg:px-16">
        <div className="text-center lg:text-start space-y-6">
          <section className="flex flex-col gap-y-3">
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
            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Explore intuitive models and simulations that make learning
              physics exciting and easy.
            </p>
          </section>
          <Button className="justify-self-center" variant="default" asChild>
            <Link href="#">Sign up for free</Link>
          </Button>
        </div>

        <div className="animation-bg justify-self-end"></div>
        <HeroImage
          className="hidden lg:flex absolute -right-0 -bottom-px"
          width={700}
        />
      </section>
    </>
  );
};

export default Hero;
