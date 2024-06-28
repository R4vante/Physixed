import { CardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "shadow-sm shadow-zinc-500 rounded-md p-4 sm:p-6 mt-10 md:mt-0 bg-[#DEE4E7]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
