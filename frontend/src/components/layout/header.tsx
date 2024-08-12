"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Icons } from "@/components/icons/icons";
import { twMerge } from "tailwind-merge";
import { links } from "@/lib/data";
import NavMenu from "@/components/layout/nav-menu";
import NavLinks from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";

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
        <Icons.logo />
        <nav className="flex flex-1 md:pl-16 justify-end md:justify-between">
          <div className="hidden md:flex flex-1 md:w-full md:align-center">
            <NavMenu />
          </div>

          <div>
            <button className="md:hidden" onClick={toggleNavBar}>
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
        </nav>

        {isOpen && (
          <div className="overflow-y-hidden flex flex-col items-center basis-full h-[90vh] justify-center">
            <ul className="h-full w-full text-center pt-12">
              {links.map((link) => (
                <li className="text-xl py-6" key={link.href}>
                  <NavLinks
                    onClick={toggleNavBar}
                    key={link.href}
                    href={link.href}
                  >
                    {link.title}
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
