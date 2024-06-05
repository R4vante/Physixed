import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavLinks = ({ children, to, className, ...props }: NavLinksProps) => {
  return (
    <>
      <NavLink
        to={to}
        {...props}
        className={twMerge("hover:text-white", className)}
      >
        {children}
      </NavLink>
    </>
  );
};

export default NavLinks;

interface NavLinksProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}
