import { Data, Layout } from "plotly.js";
import React from "react";
import { z } from "zod";

// Types
export type GraphProps = {
    className?: string;
    data: Data[];
    layout: Partial<Layout>;
  };

  export type LabelProps = {
    htmlFor: string;
    children: React.ReactNode;
    className?: string;
  };

  export type CardProps = {
    children: React.ReactNode;
    className?: string;
  }



// Schemas
export const freeFallSchema = z.object({
    height: z.string(),
    height_unit: z.enum(["m", "km"]),
    velocity: z.string(),
    velocity_unit: z.enum(["m/s", "km/h"]),
  });

export type TFreeFall = z.infer<typeof freeFallSchema>;
