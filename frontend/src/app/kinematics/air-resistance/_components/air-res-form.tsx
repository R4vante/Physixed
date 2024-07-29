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
import { TAirResistance } from "@/lib/types";
import { Controller, useForm, FieldErrors } from "react-hook-form";
import { inputParameters } from "@/lib/data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AirResForm = () => {
  const form = useForm<TAirResistance>();
  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6">
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
      </form>
    </Form>
  );
};

export default AirResForm;
