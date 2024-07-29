import { Data, Layout } from "plotly.js";
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
    velocity_toggle: z.boolean().default(false).optional(),
  });


export type TFreeFall = z.infer<typeof freeFallSchema>;

export const airResistanceSchema = freeFallSchema.extend({
  mass: z.coerce.number().min(1, {
    message: "Mass must be greater than 0."
  }),
  mass_unit: z.enum(["g", "kg"]),
  drag_coefficient: z.coerce.number().min(0, {
    message: "Drag coefficient must be greater than or equal to 0."
  }),
  area: z.coerce.number().min(0, {
    message: "Area must be greater than or equal to 0."
  }),
  area_unit: z.enum(["cm^2", "m^2"]),
  density: z.coerce.number().min(0, {
    message: "Density must be greater than or equal to 0."
  }),
  density_unit: z.enum(["kg/m^3", "g/cm^3"]),
});

export type TAirResistance = z.infer<typeof airResistanceSchema>;

export const contactSchema = z.object({
  name: z.string({
    message: "First name is required."
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string({
    message: "Message is required."
  })
  })

export type TContact = z.infer<typeof contactSchema>;
