"use client";
import { GraphProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React from "react";
import { useTheme } from "next-themes";
import { Data, Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const adjustLayout = (layout: Partial<Layout>, isDark: boolean) => ({
  ...layout,
  autosize: true,
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: isDark ? "#25272d" : "#f0f0f0",
  font: {
    color: isDark ? "#c6d6e7" : "black",
  },
  xaxis: {
    ...layout.xaxis,
    gridcolor: isDark ? "#c6d6e7" : "#ddd",
    zerolinecolor: isDark ? "#c6d6e7" : "#ddd",
  },
  yaxis: {
    ...layout.yaxis,
    gridcolor: isDark ? "#c6d6e7" : "#ddd",
    zerolinecolor: isDark ? "#c6d6e7" : "#ddd",
    range: layout.yaxis?.range || [0, null],
  },
});

const adjustData = (data: Partial<Data>[], isDark: boolean): Partial<Data>[] =>
  data.map((trace) => ({
    ...trace,
    line: {
      color: isDark ? "#4be" : "#45e",
      width: 2,
      dash: "solid",
    },
  }));

const LinePlot = (plotData: GraphProps, className: string) => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const adjustedLayout = adjustLayout(plotData.layout, isDark);
  const adjustedData = adjustData(plotData.data, isDark);

  return (
    <div className={cn("h-[450px]", className)}>
      <Plot
        data={adjustedData}
        layout={adjustedLayout}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default LinePlot;
