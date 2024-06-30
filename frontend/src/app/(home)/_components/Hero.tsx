import HeroCards from "@/app/(home)/_components/HeroCards";
import "../index.css";

const Hero = () => {
  return (
    <>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <section className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">Here comes some text</h1>
          </section>
        </div>
        <div className="z-10">
          <HeroCards />
        </div>
        <div className="animation-bg"></div>
      </section>
    </>
  );
};

export default Hero;
