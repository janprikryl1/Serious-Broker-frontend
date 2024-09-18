import axios from "axios";
import {UserType} from "../utils/types/user/userTypes.ts";
import {backendUrl} from "../env.ts";
import {DashboardDataType} from "../utils/types/DashboardDataType.ts";
import {TableLogType} from "../utils/types/TableLogType.ts";

export const getDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.get<DashboardDataType>(backendUrl + "user/admin_dashboard_details.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.get<UserType[]>(backendUrl + "user/all_users.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
    });

    return await res;
}

export const getAllLogs = async (page: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.get<{ data: TableLogType[], totalPages: number }>(backendUrl + "table_log/get_all_logs.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
        params: {
            page,
        },
    });
    return await res;
};