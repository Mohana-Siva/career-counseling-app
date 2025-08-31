// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "Frontend", // <-- tell vite where frontend code lives
  plugins: [react()],
  build: {
    outDir: "../dist" // build output folder relative to root
  }
});
