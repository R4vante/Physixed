"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { airResistanceSchema, TAirResistance } from "@/lib/types";
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { inputParameters } from "@/lib/data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

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
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {inputParameters.map((input) => (
          <div
            key={input.name}
            className="flex space-x-4 justify-between w-full"
          >
            <FormField
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel
                      className="font-bold text-xl"
                      htmlFor={input.name}
                    >
                      {input.label}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      id={input.name}
                      type="number"
                      step="any"
                      className="w-28 text-right"
                    />
                  </FormControl>
                  <FormMessage>
                    {
                      form.formState.errors[
                        input.name as keyof FieldErrors<TAirResistance>
                      ]?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            {input.unitName && input.unitOptions && (
              <FormField
                name={input.unitName}
                render={({ field }) => (
                  <FormItem className="flex items-end ">
                    <FormControl>
                      <Controller
                        control={form.control}
                        name={input.unitName as keyof TAirResistance}
                        render={({ field }) => (
                          <Select
                            value={field.value as string}
                            onValueChange={field.onChange}
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
