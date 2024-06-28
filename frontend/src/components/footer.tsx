import { cn } from "@/lib/utils";
import React from "react";

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      {...props}
      className={cn("sticky text-center top-[100vh]", className)}
    >
      <p>&copy; Physixed 2024</p>
    </footer>
  );
};

export default Footer;

type FooterProps = {
  className?: string;
};
