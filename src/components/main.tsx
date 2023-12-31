import React from "react";
import App from "../components/App";
import "../CSS/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!); // notice the '!', to tell typescript that we know it's not null
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
