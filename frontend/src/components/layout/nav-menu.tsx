"use client";
import NavLinks from "@/components/layout/nav-links";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { links } from "@/lib/data";

const NavMenu = () => {
  return (
    <div className="w-full flex justify-center">
      <NavigationMenu className="bg-none w-full">
        <NavigationMenuList className="gap-x-3 bg-transparent">
          {links.map((link) =>
            link.subRoutes ? (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                  <NavigationMenuLink href={link.href}>
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex bg-background">
                  <ul className="flex flex-col w-[600px]">
                    {link.subRoutes?.map((subRoute) => (
                      <NavLinks key={subRoute.href} href={subRoute.href}>
                        {subRoute.title}
                      </NavLinks>
                    ))}
                  </ul>
                </NavigationMenuContent>
                <NavigationMenuViewport className="bg-none" />
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-accent/50`}
                key={link.href}
              >
                <NavigationMenuLink href={link.href}>
                  {link.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
