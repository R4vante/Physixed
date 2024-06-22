import { Data, Layout } from "plotly.js";


export type GraphProps = {
    data: Data[];
    layout: Partial<Layout>;
  };
