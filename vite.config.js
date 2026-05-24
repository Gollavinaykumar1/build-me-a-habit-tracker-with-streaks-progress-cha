import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/build-me-a-habit-tracker-with-streaks-progress-cha/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
