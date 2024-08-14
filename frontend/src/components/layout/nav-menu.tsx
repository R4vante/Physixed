"use client";

import React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { links } from "@/lib/data";
import Link from "next/link";

const navigationLinks = links;

const NavMenu = ({ className }: MenuProps) => {
  return (
    <NavigationMenu className={cn("hidden sm:inline-block", className)}>
      <NavigationMenuList className="">
        <NavigationMenuItem>
          {navigationLinks
            .filter((link) => link.subRoutes)
            .map((link) => (
              <React.Fragment key={link.name}>
                <Link href={link.path}>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                    {link.name}
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {link.subRoutes?.map((subLink) => (
                      <ListItem
                        key={subLink.name}
                        title={subLink.name}
                        href={subLink.path}
                      >
                        {subLink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </React.Fragment>
            ))}
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="bg-card" />
    </NavigationMenu>
  );
};

type MenuProps = {
  className?: string;
};

export default NavMenu;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
