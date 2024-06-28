"use client";

import Label from "@/components/Label";
import { TFreeFall, freeFallSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FreeFallForm = ({ onSubmit }: FreeFallFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFreeFall>({
    resolver: zodResolver(freeFallSchema),
    defaultValues: {
      height: "10",
      height_unit: "m",
      velocity: "0",
      velocity_unit: "m/s",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="xData">x data</Label>
        <input
          {...register("height")}
          id="xData"
          type="number"
          placeholder="0"
        />
        {errors.height && <p>{errors.height.message}</p>}
        <select {...register("height_unit")} id="xUnit">
          <option value="m">m</option>
          <option value="km">km</option>
        </select>
      </div>
      <div>
        <label htmlFor="yData">Y Data:</label>
        <input
          {...register("velocity")}
          id="yData"
          type="text"
          placeholder="0"
        />
        <select {...register("velocity_unit")} id="yUnit">
          <option value="m/s">m/s</option>
          <option value="km/h">km/h</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FreeFallForm;

type FreeFallFormProps = {
  onSubmit: (data: TFreeFall) => void;
};
