import { BrowserRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { Router } from "@/Router.tsx"
import { RequireRole } from "@/components/auth/RequireRole.tsx"
import { UserRole } from "@/utils/types/user.ts"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename="/editor">
          <RequireRole
            allowed={[UserRole.Editor, UserRole.Admin, UserRole.Manager]}
          >
            <Router />
          </RequireRole>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
