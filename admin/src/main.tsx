import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ErrorBoundary } from "react-error-boundary"

import "./index.css"
import App from "@/App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ErrorFallback } from "@/pages/ErrorFallback.tsx"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("V index.html chybí element #root.")
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error(error, info)
      }}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)
