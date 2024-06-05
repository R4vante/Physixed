import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import NavLinks from "./NavLinks";

const links = {
  About: "/about",
  Kinematics: "/kinematics",
  App2: "/app2",
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-end">
        <div className="hidden md:flex w-full justify-between">
          {Object.entries(links).map(([name, link]) => (
            <NavLinks key={name} to={link} className="text-lg mx-4">
              {name}
            </NavLinks>
          ))}
        </div>
        <div>
          <button className="md:hidden" onClick={toggleNavBar}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="overflow-y-hidden flex flex-col items-center basis-full h-screen justify-center">
          <ul className="h-full w-full text-center pt-12">
            {Object.entries(links).map(([name, link], index) => (
              <li className="text-xl py-6" key={index}>
                <NavLinks key={name} to={link}>
                  {name}
                </NavLinks>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
