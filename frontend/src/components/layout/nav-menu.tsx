"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { links } from "@/lib/data";

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-3">
        {links.map((link) =>
          link.subRoutes ? (
            <NavigationMenuItem key={link.path}>
              <NavigationMenuTrigger className="bg-transparent">
                <NavigationMenuLink href={link.path}>
                  {link.name}
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {link.subRoutes?.map((subRoute) => (
                    <li className="row-span-3" key={subRoute.path}>
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={subRoute.path}
                        >
                          {subRoute.name}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={link.path}>
              <NavigationMenuLink href={link.path}>
                {link.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;

<NavigationMenuItem>
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
</NavigationMenuItem>;
