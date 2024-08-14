import { cn } from "@/lib/utils";
import React from "react";

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      {...props}
      className={cn(
        "sticky flex justify-between items-center px-6 py-2 top-[100vh]",
        className
      )}
    >
      <p>&copy; Physixed 2024</p>
    </footer>
  );
};

export default Footer;

type FooterProps = {
  className?: string;
};
