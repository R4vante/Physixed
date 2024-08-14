import { Icons } from "@/components/icons";
import NavMenu from "@/components/layout/nav-menu";
import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold text-2xl">Physixed</span>
      </Link>
      <NavMenu />
    </nav>
  );
};

export default MainNav;
