import { cn } from "@/lib/utils";
import Image from "next/image";
import MoonImage from "@/assets/moon_surface.png";

const HeroImage = ({ className, width }: HeroImageProps) => {
  return (
    <div className={cn(className)}>
      <Image
        src={MoonImage}
        alt="Image of the surface of the moon"
        width={width || 500}
      />
    </div>
  );
};

export default HeroImage;

type HeroImageProps = {
  className?: string;
  width?: number;
};
