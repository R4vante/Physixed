import { Data, Layout } from "plotly.js";
import React from "react";
import { z } from "zod";

// Types
export type GraphProps = {
    className?: string;
    data: Data[];
    layout: Partial<Layout>;
  };

// Schemas
export const freeFallSchema = z.object({
  height: z.coerce.number().min(1, {
    message: "Height must be greater than 0."
  }),
    height_unit: z.enum(["m", "km"]),
    velocity: z.coerce.number().min(0, {
      message: "Velocity must be greater than or equal to 0."
    }),
    velocity_unit: z.enum(["m/s", "km/h"]),
  });


export type TFreeFall = z.infer<typeof freeFallSchema>;
