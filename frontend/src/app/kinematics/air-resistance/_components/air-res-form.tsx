"use client";

import { TAirResistance, airResistanceSchema } from "@/lib/types";
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
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        {inputParameters.map((input) => (
          <FormItem
            key={input.name}
            className="flex flex-col justify-center align-center w-full"
          >
            <FormLabel
              className={`font-bold text-xl ${
                form.formState.errors[input.name as keyof TAirResistance]
                  ? "text-error"
                  : "text-label"
              }`}
              htmlFor={input.name}
            >
              {input.label}
            </FormLabel>
            <div className="flex space-x-4 w-full">
              <FormField
                control={form.control}
                name={input.name as keyof TAirResistance}
                render={({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      className="w-28 text-right"
                      type="number"
                      step={0.01}
                      id={input.name}
                      name={input.name}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      value={typeof field.value === "number" ? field.value : 0}
                    />
                  </FormControl>
                )}
              />
              {input.unitName && input.unitOptions && (
                <FormField
                  control={form.control}
                  name={input.unitName as keyof TAirResistance}
                  render={({ field }) => (
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
                  )}
                />
              )}
            </div>

            {/* Error Message */}
            <FormMessage className="text-red-600 dark:text-red-400 max-w-[240px] text-center">
              {
                form.formState.errors[input.name as keyof TAirResistance]
                  ?.message
              }
            </FormMessage>
          </FormItem>
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
