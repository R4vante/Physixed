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
              <NavigationMenuItem key={link.path}>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                  <NavigationMenuLink href={link.path}>
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex bg-background">
                  <ul className="flex flex-col w-[600px]">
                    {link.subRoutes?.map((subRoute) => (
                      <NavLinks key={subRoute.path} href={subRoute.path}>
                        {subRoute.name}
                      </NavLinks>
                    ))}
                  </ul>
                </NavigationMenuContent>
                <NavigationMenuViewport className="bg-none" />
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem
                className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-accent/50`}
                key={link.path}
              >
                <NavigationMenuLink href={link.path}>
                  {link.name}
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

{
  /* <NavigationMenuItem>
  <NavigationMenuTrigger className="bg-transparent">
    <NavigationMenuLink href="/kinematics">Kinematics</NavigationMenuLink>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <li className="row-span-3">
        <NavigationMenuLink asChild>
          <a
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/kinematics/freefall"
          >
            Free Fall Motion
          </a>
        </NavigationMenuLink>
      </li>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>; */
}
