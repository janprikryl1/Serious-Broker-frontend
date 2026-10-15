import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/internal/',
  server: {
    // PORT se respektuje, když je nastavený (CI, kontejner, obsazený port),
    // jinak platí 5176 — na ten míří proxy ve `web/vite.config.ts`.
    //
    // Bez tohohle si vite bral 5173, tedy port `web`, a projekty si porty
    // přebíraly navzájem podle toho, co se spustilo první.
    port: Number(process.env.PORT) || 5176,
  },
})
