// Entry point for the build script in your package.json
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes";

// Ponto de entrada da aplicação
const container = document.getElementById("yield");
const root = createRoot(container);
root.render(<App />);
