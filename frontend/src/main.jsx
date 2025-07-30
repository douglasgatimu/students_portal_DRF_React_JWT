import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/routers/router.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "tailwindcss/tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);
