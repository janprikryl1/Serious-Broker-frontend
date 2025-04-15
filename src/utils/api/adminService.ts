import axios from "axios";
import {backendUrl} from "../../env.ts";
import {UserType} from "../types/user/userTypes.ts";
import {DashboardDataType} from "../types/user/DashboardDataType.ts";
import {TableLogType} from "../types/admin/TableLogType.ts";

export const getDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.get<DashboardDataType>(backendUrl + "user/admin_dashboard_details.php", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.get<UserType[]>(backendUrl + "user/all_users.php", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getAllLogs = async (page: number = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.get<{ data: TableLogType[], totalPages: number }>(backendUrl + "table_log/get_all_logs.php", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            page,
        },
    });
};

export const updateUser = async (user: UserType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.post(backendUrl + "user/admin_update.php", user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};