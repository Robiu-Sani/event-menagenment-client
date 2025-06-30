import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/default/Router";
import Context from "./Component/default/Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context><RouterProvider router={router} /></Context>
    
  </StrictMode>
);
