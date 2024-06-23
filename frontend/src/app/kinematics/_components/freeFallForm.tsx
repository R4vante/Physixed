"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const FreeFallForm = ({ onSubmit }: FreeFallFormProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="xData">X Data:</label>
        <input
          {...register("height")}
          id="xData"
          type="number"
          placeholder="0"
        />
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
  onSubmit: (data: FieldValues) => void;
};
