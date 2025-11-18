import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/default.css";
import Router_all from "./router/all";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Router_all />
  </HelmetProvider>
);
