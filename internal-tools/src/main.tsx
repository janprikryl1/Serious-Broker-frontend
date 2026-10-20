import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ErrorFallback } from "@/pages/ErrorFallback.tsx"
import { ErrorBoundary } from "react-error-boundary"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error(error, info);
      }}
    >
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)
