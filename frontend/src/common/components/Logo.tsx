import { NavLink } from "react-router-dom";
import LogoSvg from "../assets/logo.svg";

const Logo = () => {
  return (
    <NavLink to="/" className="flex items-center">
      <img
        src={LogoSvg}
        alt=" "
        style={{ fill: "#FFFFFF " }}
        className="h-[30px] my-4 mr-2 md:h-[50px]"
      />
      <h1 className="m-0 text-2xl font-bold">Physixed</h1>
    </NavLink>
  );
};

export default Logo;
