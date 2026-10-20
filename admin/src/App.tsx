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
      // Admin data se čtou opakovaně při přepínání stránek; minuta stačí,
      // ať se při každém návratu nevolá backend znovu.
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename="/admin">
          <RequireRole allowed={[UserRole.Admin, UserRole.Manager]}>
            <Router />
          </RequireRole>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
