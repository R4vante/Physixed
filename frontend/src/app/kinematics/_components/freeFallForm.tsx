"use client";

import { TFreeFall, freeFallSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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

const FreeFallForm = ({ onSubmit }: FreeFallFormProps) => {
  const form = useForm<TFreeFall>({
    resolver: zodResolver(freeFallSchema),
    defaultValues: {
      height: 10,
      height_unit: "m",
      velocity: 0,
      velocity_unit: "m/s",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="height">Initial Height</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-28 text-right"
                    type="number"
                    step="any"
                    id="height"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.height?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height_unit"
            render={({ field }) => (
              <FormItem className="flex items-end">
                <FormControl>
                  <Controller
                    control={form.control}
                    name="height_unit"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-28" id="height_unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="km">km</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="velocity"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="velocity">Velocity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-28 text-right"
                    type="number"
                    step="any"
                    id="velocity"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.velocity?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="velocity_unit"
            render={({ field }) => (
              <FormItem className="flex items-end">
                {/* <FormLabel htmlFor="velocity_unit">Velocity Unit</FormLabel> */}
                <FormControl>
                  <Controller
                    control={form.control}
                    name="velocity_unit"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-28" id="velocity_unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m/s">m/s</SelectItem>
                          <SelectItem value="km/h">km/h</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant="default" type="submit">
          Submit
        </Button>
        {/* <button type="submit">Submit</button> */}
      </form>
    </Form>
  );
};

export default FreeFallForm;

{
  /* <label htmlFor="xData">x data</label>
          <input
            {...form.register("height")}
            id="xData"
            type="number"
            placeholder="0"
          />
          {form.formState.errors.height && (
            <p>{form.formState.errors.height.message}</p>
          )}
          <select {...form.register("height_unit")} id="xUnit">
            <option value="m">m</option>
            <option value="km">km</option>
          </select>
        </div>
        <div>
          <label htmlFor="yData">Y Data:</label>
          <input
            {...form.register("velocity")}
            id="yData"
            type="text"
            placeholder="0"
          />
          <select {...form.register("velocity_unit")} id="yUnit">
            <option value="m/s">m/s</option>
            <option value="km/h">km/h</option>
          </select> */
}

type FreeFallFormProps = {
  onSubmit: (data: TFreeFall) => void;
};
