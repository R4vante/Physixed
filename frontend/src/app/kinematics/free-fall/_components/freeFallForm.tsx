"use client";

import { TFreeFall, freeFallSchema } from "@/lib/types";
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
import { Switch } from "@/components/ui/switch";

const FreeFallForm = ({ onSubmit }: FreeFallFormProps) => {
  const form = useForm<TFreeFall>({
    resolver: zodResolver(freeFallSchema),
    defaultValues: {
      height: 10,
      height_unit: "m",
      velocity: 0,
      velocity_unit: "m/s",
      velocity_toggle: false,
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
                <FormLabel className="font-bold text-xl" htmlFor="height">
                  Initial Height
                </FormLabel>
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
                <FormLabel className="font-bold text-xl" htmlFor="velocity">
                  Velocity
                </FormLabel>
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
      </form>
    </Form>
  );
};

export default FreeFallForm;

type FreeFallFormProps = {
  onSubmit: (data: TFreeFall) => void;
};
