import { Button } from "@/components/ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from "react";
import { links } from "@/lib/data";
import { useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { Icons } from "@/components/icons";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="w-10 px-0 sm:hidden">
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-zinc-900">
        <MobileLink
          href="/"
          onOpenChange={setOpen}
          className="flex items-center space-x-2"
        >
          <Icons.logo className="w-10 h-10" />
          <span className="font-bold">Physixed</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          {links.map((link) => (
            <React.Fragment key={link.title}>
              <MobileLink
                href={link.href}
                onOpenChange={setOpen}
                className="capitalize"
              >
                {link.title}
              </MobileLink>
            </React.Fragment>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

const MobileLink = ({
  href,
  onOpenChange,
  children,
  className,
}: MobileLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

type MobileLinkProps = LinkProps & {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
