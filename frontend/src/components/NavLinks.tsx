import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const NavLinks = ({ children, href, className, ...props }: NavLinksProps) => {
  return (
    <>
      <Link
        href={href}
        {...props}
        className={twMerge("hover:text-white", className)}
      >
        {children}
      </Link>
    </>
  );
};

export default NavLinks;

type NavLinksProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};
