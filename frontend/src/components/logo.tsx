import Image from "next/image";
import LogoSvg from "/public/logo.svg";

const Logo = ({ className }: logoProps) => {
  return <Image src={LogoSvg} alt=" " className={className} />;
};

export default Logo;

type logoProps = {
  className?: string;
};
