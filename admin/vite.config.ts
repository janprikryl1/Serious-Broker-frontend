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
  // Nasazuje se jako subpath na stejné doméně jako `web` — díky tomu je
  // localStorage (a v něm token) stejný origin a nemusí se nikam předávat.
  base: "/admin/",
  server: {
    // PORT se respektuje, když je nastavený (CI, kontejner, obsazený port),
    // jinak platí 5174 — na ten míří proxy ve `web/vite.config.ts`.
    port: Number(process.env.PORT) || 5174,
  },
})
