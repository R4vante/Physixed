import Image from "next/image";
import LogoSvg from "/public/logo.svg";

const Logo = () => {
  return (
      <Image src={LogoSvg} width={50} height={50} alt=" " />
  );
};

export default Logo;
