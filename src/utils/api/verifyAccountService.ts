import { api } from "./axiosInstance.ts";

export const verifyAccount = async (user_id: string, token: string) => {
    return await api.post(`email/templates/verify_account.php`, {
        user_id: user_id,
        token: token
    });
};

export const sendVerificationEmailAgain = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    return await api.post(`email/templates/verify_account_again.php`, {});
}