import { useQuery } from "@tanstack/react-query"
import { api } from "@/utils/api/axiosInstance.ts"
import type { IsAuthenticatedResponse, UserType } from "@/utils/types/user.ts"
import type { UserRole } from "@/utils/types/user.ts"
import { clearToken, getToken } from "@/utils/auth/token.ts"
import { redirectToHome } from "@/utils/auth/redirect.ts"

export const AUTH_QUERY_KEY = ["auth", "is_authenticated"] as const

/**
 * Nahrazuje `ProviderUser` z webu. Místo contextu + useState + useEffect
 * stačí jeden query — TanStack Query drží výsledek v cache, takže se
 * `is_authenticated.php` nevolá při každém přemountování.
 */
export const useAuth = () => {
  const hasToken = getToken() !== null

  const { data, isPending, isError } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get<IsAuthenticatedResponse>(
        "user/is_authenticated.php"
      )
      return response.data.user
    },
    // Bez tokenu nemá smysl na backend chodit vůbec.
    enabled: hasToken,
    // Role se během session nemění; čerstvost řeší reload nebo 401 interceptor.
    staleTime: Infinity,
    retry: false,
  })

  return {
    user: data,
    /* Bez tokenu je hotovo hned — `isPending` by u disabled query zůstalo true navždy. */
    isLoading: hasToken && isPending,
    isAuthenticated: hasToken && !isError && data !== undefined,
  }
}

export const hasRole = (user: UserType | undefined, allowed: UserRole[]) =>
  user !== undefined && allowed.includes(user.role)

export const logout = () => {
  clearToken()
  redirectToHome()
}
