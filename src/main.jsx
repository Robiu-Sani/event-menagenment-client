import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Component/default/Router";
import Context from "./Component/default/Context";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" />
    <Context>
      <RouterProvider router={router} />
    </Context>
  </StrictMode>
);
