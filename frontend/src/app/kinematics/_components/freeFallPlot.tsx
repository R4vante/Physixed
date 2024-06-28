import { GraphProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const FreeFallPlot = (plotData: GraphProps, className: string) => {
  return (
    <div
      className={cn(
        "w-full h-full sm:w-96 sm:h-96 md:w-128 md:h-128 lg:w-full lg:h-full",
        className
      )}
    >
      <Plot
        data={plotData.data}
        layout={{ ...plotData.layout, autosize: true }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default FreeFallPlot;
