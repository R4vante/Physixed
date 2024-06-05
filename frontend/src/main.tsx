import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./common/providers/AppProvider.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
);
