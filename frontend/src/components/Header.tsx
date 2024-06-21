"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/logo";
import { twMerge } from "tailwind-merge";
import { links } from "@/lib/data";
import NavLinks from "@/components/navLinks";

const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className={twMerge(
          "mb-4 px-4 top-0 z-[20] flex flex-wrap items-center justify-between md:px-10 lg:px-15",
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
        </nav>
      </header>
    </>
  );
};

export default Header;

type HeaderProps = {
  className?: string;
};
