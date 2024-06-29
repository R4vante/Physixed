import Link from "next/link";
import { links } from "@/lib/data";
import Image from "next/image";
import LogoSvg from "/public/logo.svg";

const Logo = () => {
  return (
    <Link href={links[0].path} className="flex items-center">
      <Image src={LogoSvg} width={50} height={50} alt=" " />
      <h1 className="m-0 text-2xl font-bold">Physixed</h1>
    </Link>
  );
};

export default Logo;
