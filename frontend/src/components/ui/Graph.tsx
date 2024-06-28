import { GraphProps } from "@/lib/types";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const Graph = ({ data, layout }: GraphProps) => {
  return (
    <>
      <Plot
        data={data}
        layout={layout}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};

export default Graph;
