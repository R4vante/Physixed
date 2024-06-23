import { Data, Layout } from "plotly.js";
import { z } from "zod";


export type GraphProps = {
    data: Data[];
    layout: Partial<Layout>;
  };


export const freeFallSchema = z.object({
    height: z.string(),
    height_unit: z.enum(["m", "km"]),
    velocity: z.string(),
    velocity_unit: z.enum(["m/s", "km/h"]),
  });

export type TFreeFall = z.infer<typeof freeFallSchema>;
