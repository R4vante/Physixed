import { GraphProps } from "@/lib/types";
import dynamic from "next/dynamic";
import { Data, Layout } from "plotly.js";

const Graph = (plotData: GraphProps) => {
  const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
  return (
    <>
      <Plot
        data={plotData.data}
        layout={plotData.layout}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};

export default Graph;
