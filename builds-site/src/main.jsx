import "./storage-shim.js";
import "@fontsource/noto-nastaliq-urdu";
import React from "react";
import ReactDOM from "react-dom/client";
import BuildsSite from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BuildsSite />
  </React.StrictMode>
);
