import { api } from "@/utils/api/axiosInstance.ts"
import type { DashboardDataType } from "@/utils/types/dashboard.ts"
import type { UserType } from "@/utils/types/user.ts"

/*
 * Oproti webu tu chybí `if (!token) return` na začátku každé funkce. Není
 * potřeba — `RequireRole` nepustí nepřihlášeného uživatele dál a 401 řeší
 * response interceptor. Služby tak vrací vždy data, ne `T | undefined`,
 * a volající se nemusí vypořádávat s undefined.
 */
export const getDashboardData = async () => {
  const response = await api.get<DashboardDataType>(
    "user/admin_dashboard_details.php"
  )
  return response.data
}

export const getAllUsers = async () => {
  const response = await api.get<UserType[]>("user/all_users.php")
  return response.data
}

export const updateUser = async (user: UserType) => {
  const response = await api.post("user/admin_update.php", user)
  return response.data
}
