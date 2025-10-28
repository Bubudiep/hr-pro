import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/default.css";
import Router_all from "./router/all";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router_all />
  </StrictMode>
);
