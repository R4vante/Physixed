import { GraphProps } from "@/lib/types";
import dynamic from "next/dynamic";
import React from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const FreeFallPlot = (plotData: GraphProps) => {
  return (
    <Plot
      data={plotData.data}
      layout={plotData.layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default FreeFallPlot;
