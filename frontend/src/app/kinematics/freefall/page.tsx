"use client";
import Graph from "@/components/graph";
import React from "react";

const FreeFall = () => {
  return (
    <>
      <section className="flex flex-col items-center sm:min-w-[35rem]">
        <h1>Free fall</h1>
        <div className="w-full flex items-center flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center justify-between">
            <form action="" className="flex flex-col gap-y-4">
              <div className="flex gap-x-4">
                <input
                  type="number"
                  className="w-10"
                  name="height"
                  id="height"
                />
                <select name="height-unit" className="w-20" id="height-unit">
                  <option value="m">m</option>
                </select>
              </div>
              <div className="flex gap-x-4">
                <input
                  type="number"
                  className="w-10"
                  name="velocity"
                  id="velocity"
                />
                <select
                  name="velocity-unit"
                  className="w-20"
                  id="velocity-unit"
                >
                  <option value="m/s">m/s</option>
                </select>
              </div>
            </form>
          </div>
          <div className="flex sm:flex-1 items-center justify-center">
            <Graph />
          </div>
        </div>
      </section>
    </>
  );
};

export default FreeFall;
