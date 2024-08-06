import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

const NavLinks = ({
  children,
  onClick,
  href,
  className,
  ...props
}: NavLinksProps) => {
  return (
    <>
      <Button className={twMerge(className)} variant="link">
        <Link href={href} onClick={onClick} {...props}>
          {children}
        </Link>
      </Button>
    </>
  );
};

export default NavLinks;

type NavLinksProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
};
