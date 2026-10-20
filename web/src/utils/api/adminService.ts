import { api } from "./axiosInstance.ts";
import {UserType} from "../types/user/userTypes.ts";
import {TableLogType} from "../types/admin/TableLogType.ts";

/*
 * `getDashboardData` a `updateUser` se přesunuly do projektu `admin`
 * (admin/src/utils/api/adminService.ts) spolu s přehledem a správou uživatelů.
 *
 * `getAllUsers` tady zůstává — používá ho ještě `useAdminAchievements`.
 */

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.get<UserType[]>("user/all_users.php");
}

export const getAllLogs = async (page: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.get<{ data: TableLogType[], totalPages: number }>("table_log/get_all_logs.php", {

        params: {
            page,
        },
    });
};
