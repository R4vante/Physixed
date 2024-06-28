import { LabelProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label className={cn("", className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
