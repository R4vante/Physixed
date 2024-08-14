import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({ title, description, className }: PageHeadingProps) => {
  return (
    <>
      <h1
        className={cn(
          "text-4xl font-bold capitalize mb-8 text-center",
          className
        )}
      >
        {title}
      </h1>

      {description && (
        <p className="text-center text-muted-foreground">{description}</p>
      )}
    </>
  );
};

type PageHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export default PageHeading;
