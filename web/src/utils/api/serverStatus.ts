import { api } from "./axiosInstance.ts";

export const checkServerHealth = async () => {
    return api.get<{ status: string }>("server/health_check.php", {
        timeout: 5000,
    });
};