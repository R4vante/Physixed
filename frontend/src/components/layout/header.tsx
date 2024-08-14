"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { links } from "@/lib/data";
import NavLinks from "@/components/layout/nav-links";
import MainNav from "@/components/layout/main-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <>
      <header
        className={cn(
          "z-10 fixed top-0 w-full bg-background/10 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
      >
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <nav className="flex items-center space-x-2">
              <div>
                <Button className="capitalize">Sign up</Button>
              </div>
              <div>
                <Button variant={"ghost"} className="capitalize">
                  Log in
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

type HeaderProps = {
  className?: string;
};
