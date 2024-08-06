import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CardWrapper = ({
  title,
  className,
  label,
  backButtonLabel,
  backButtonRef,
  children,
}: CardWrapperProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {label && <p className="text-muted-foreground text-sm">{label}</p>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonLabel && backButtonRef && (
        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href={backButtonRef}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;

type CardWrapperProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  label?: string;
  backButtonLabel?: string;
  backButtonRef?: string;
};
