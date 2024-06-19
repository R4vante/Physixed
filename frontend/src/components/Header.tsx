"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/components/Logo";
import { twMerge } from "tailwind-merge";
import { links } from "@/lib/data";
import NavLinks from "@/components/NavLinks";

const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header
        className={twMerge(
          "fixed mb-4 px-4 top-[1rem] z-[20] flex w-full flex-wrap items-center justify-between md:px-10 lg:px-15",
          className
        )}
        {...props}
      >
        <Logo />
        <nav>
          <div>
            <ul className="flex">
              {links.map((link) => (
                <li className="ml-4" key={link.path}>
                  <NavLinks href={link.path}>{link.title}</NavLinks>
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
