import React from "react";
import ReactDOM from "react-dom/client";
import "./../src/styles/global-style.css";
import { Home } from "./templates/Home/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
