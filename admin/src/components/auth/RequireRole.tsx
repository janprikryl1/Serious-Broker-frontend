import { useEffect, type FC, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { hasRole, useAuth } from "@/utils/hooks/useAuth.ts"
import type { UserRole } from "@/utils/types/user.ts"
import { redirectToSignIn } from "@/utils/auth/redirect.ts"
import { Forbidden } from "@/pages/Forbidden.tsx"

type Props = {
  allowed: UserRole[]
  children: ReactNode
}

/**
 * Guard pro celou aplikaci. Nahrazuje `PROTECTED_ROUTES` + useEffect
 * z `providerUser.tsx` ve webu.
 *
 * Nepřihlášený uživatel jde na login webu, přihlášený s nedostatečnou rolí
 * dostane Forbidden. Rozlišení je podstatné — redirect na login u už
 * přihlášeného uživatele by jen cykloval.
 */
export const RequireRole: FC<Props> = ({ allowed, children }) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToSignIn()
    }
  }, [isLoading, isAuthenticated])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <span className="sr-only">Načítání…</span>
      </div>
    )
  }

  // Redirect už běží z effectu, mezitím nic nevykreslujeme.
  if (!isAuthenticated) {
    return null
  }

  if (!hasRole(user, allowed)) {
    return <Forbidden />
  }

  return <>{children}</>
}
