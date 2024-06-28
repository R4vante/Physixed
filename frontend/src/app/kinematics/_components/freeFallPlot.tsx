import { GraphProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const FreeFallPlot = (plotData: GraphProps, className: string) => {
  const adjustedLayout = {
    ...plotData.layout,
    autosize: true,
    margin: {
      l: 50, // Linker marge
      r: 10, // Rechter marge, zo klein mogelijk
      b: 50, // Onderste marge
      t: 50, // Bovenste marge
      pad: 0, // Padding
    },
  };
  return (
    <div
      className={cn(
        "flex justify-center w-full h-full p-0 sm:w-96 sm:h-96",
        className
      )}
    >
      <Plot
        data={plotData.data}
        layout={adjustedLayout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default FreeFallPlot;
