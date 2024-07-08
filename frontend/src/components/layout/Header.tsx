"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/layout/Logo";
import { twMerge } from "tailwind-merge";
import { links } from "@/lib/data";
import NavLinks from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className={twMerge(
          "mb-4 fixed px-4 top-0 z-[20] w-full flex bg-background/10 backdrop-blur-[0.5rem] flex-wrap items-center justify-between md:px-10 lg:px-15",
          className
        )}
        {...props}
      >
        <Logo />
        <nav className="flex justify-end">
          <div className="hidden md:flex w-full justify-between">
            <ul className="flex justify-center gap-y-1 sm:gap-5">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLinks href={link.path}>{link.name}</NavLinks>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="md:hidden" onClick={toggleNavBar}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="overflow-y-hidden flex flex-col items-center basis-full h-[90vh] justify-center">
            <ul className="h-full w-full text-center pt-12">
              {links.map((link) => (
                <li className="text-xl py-6" key={link.path}>
                  <NavLinks
                    onClick={toggleNavBar}
                    key={link.path}
                    href={link.path}
                  >
                    {link.name}
                  </NavLinks>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

type HeaderProps = {
  className?: string;
};
