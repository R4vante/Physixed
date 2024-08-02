"use client";

import {
  TAirResistance,
  TFreeFall,
  airResistanceSchema,
  freeFallSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { inputParameters } from "@/lib/data";
const AirResForm = ({ onSubmit }: AirResFormProps) => {
  const form = useForm<TAirResistance>({
    resolver: zodResolver(airResistanceSchema),
    defaultValues: {
      height: 10,
      height_unit: "m",
      velocity: 0,
      velocity_unit: "m/s",
      mass: 1,
      mass_unit: "kg",
      drag_coefficient: 0.47,
      area: 1,
      area_unit: "m^2",
      density: 1.225,
      density_unit: "kg/m^3",

      velocity_toggle: false,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        {inputParameters.map((input) => (
          <div className="flex space-x-4" key={input.name}>
            <FormField
              control={form.control}
              name={input.name as keyof TAirResistance}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xl" htmlFor="height">
                    {input.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-28 text-right"
                      type="number"
                      step="any"
                      id={input.name}
                      name={input.name}
                      value={typeof field.value === "number" ? field.value : 0}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.height?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {input.unitName && input.unitOptions && (
              <FormField
                control={form.control}
                name={input.unitName as keyof TAirResistance}
                render={(field) => (
                  <FormItem className="flex items-end">
                    <FormControl>
                      <Controller
                        control={form.control}
                        name={input.unitName as keyof TAirResistance}
                        render={({ field }) => (
                          <Select
                            value={field.value as string}
                            onValueChange={field.onChange}
                            name={input.unitName}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue>
                                {field.value
                                  ? field.value
                                  : input.unitOptions[0]}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {input.unitOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
        ))}
        <Button variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AirResForm;

type AirResFormProps = {
  onSubmit: (data: TAirResistance) => void;
};
