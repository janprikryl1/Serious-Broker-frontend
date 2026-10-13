import axios from "axios"
import { backendUrl } from "@/env.ts"
import { clearToken, TOKEN_STORAGE_KEY } from "@/utils/auth/token.ts"
import { redirectToSignIn } from "@/utils/auth/redirect.ts"

/**
 * Centrální axios instance pro komunikaci s backendem. Stejná konvence jako
 * `web/src/utils/api/axiosInstance.ts` — cesty se předávají relativně:
 *
 *   api.get<UserType[]>("admin/users.php")
 *
 * Content-Type se ZÁMĚRNĚ nenastavuje jako default, aby axios u FormData
 * doplnil multipart/form-data včetně boundary.
 *
 * Instance je určená výhradně pro vlastní backend. Na cizí API použij čistý
 * `axios`, ať tam neposíláš náš token.
 */
export const api = axios.create({
  baseURL: backendUrl,
})

// Token se čte až při odeslání requestu, ne při vytvoření instance — jinak by
// se po přihlášení v jiném tabu používal zastaralý token až do reloadu.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/*
 * Na rozdíl od `web` tu 401 řešíme centrálně. Admin je celý za přihlášením,
 * takže vypršelý token nemá jak skončit jinak než odhlášením — nemá smysl to
 * nechávat na každé komponentě zvlášť.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken()
      redirectToSignIn()
    }
    return Promise.reject(error)
  }
)
