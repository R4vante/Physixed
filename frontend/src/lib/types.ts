import { StaticImageData } from "next/image";
import { Data, Layout } from "plotly.js";
import { z } from "zod";

// Types
// ----------------------------------------------

// Type for routes
export type IRoute = {
  title: string;
  href: string;
  params?: Array<Params>;
  subRoutes?: Array<ISubRoute>;
}

export type ISubRoute = {
  title: string;
  href: string;
  description: string;
  image: StaticImageData;
}

// Type for additional parameters in routes (e.g. /:id)
export type Params = {
  id: string;
  value: string;
}

// Typing for graph components
export type GraphProps = {
    className?: string;
    data: Data[];
    layout: Partial<Layout>;
  };

  // Typing for input units
export type InputParams = {
  name: string;
  label: string;
  unitName?: string;
  unitOptions?: string[];
}


// ----------------------------------------------
// Schemas

// Schema for the free fall form
export const freeFallSchema = z.object({
    height: z.coerce.number().positive({
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


// Schema for the air resistance form
export const airResistanceSchema = freeFallSchema.extend({
  mass: z.coerce.number().positive({
    message: "Mass must be greater than 0."
  }),
  mass_unit: z.enum(["g", "kg"]),

  drag_coefficient: z.coerce.number().positive({
    message: "Drag coefficient must be greater than 0."
  }),
  area: z.coerce.number().positive({
    message: "Area must be greater than 0."
  }),
  area_unit: z.enum(["cm^2", "m^2"]),
  density: z.coerce.number().positive({
    message: "Density must be greater than 0."
  }),
  density_unit: z.enum(["kg/m^3", "g/cm^3"]),
});

export type TAirResistance = z.infer<typeof airResistanceSchema>;


// Schema for the contact Form
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
