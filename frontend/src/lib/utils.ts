import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// utility function to merge tailwindCSS classes
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
