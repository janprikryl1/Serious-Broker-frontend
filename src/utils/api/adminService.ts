import { api } from "./axiosInstance.ts";
import {UserType} from "../types/user/userTypes.ts";
import {DashboardDataType} from "../types/user/DashboardDataType.ts";
import {TableLogType} from "../types/admin/TableLogType.ts";

export const getDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.get<DashboardDataType>("user/admin_dashboard_details.php");
}

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

export const updateUser = async (user: UserType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.post("user/admin_update.php", user);
};