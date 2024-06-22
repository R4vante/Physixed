import React from "react";
import { twMerge } from "tailwind-merge";

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={twMerge("sticky text-center top-[100vh]", className)}>
      <p>&copy; Physixed 2024</p>
    </footer>
  );
};

export default Footer;

type FooterProps = {
  className?: string;
};
