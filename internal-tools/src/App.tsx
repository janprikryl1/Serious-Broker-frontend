import { BrowserRouter } from "react-router"
import { Toaster } from "@/components/ui/sonner.tsx"
import { Header } from "@/components/Header.tsx"
import { Footer } from "@/components/Footer.tsx"
import { Router } from "@/Router.tsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <BrowserRouter basename="/internal">
        <div className="min-h-screen bg-[#1a1916]">
          <Header />
          <main className="container mx-auto px-6 py-8">
            <Router />
            <Footer />
          </main>
        </div>
        <Toaster />
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
