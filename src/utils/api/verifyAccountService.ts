import axios from "axios";
import {backendUrl} from "../../env.ts";

export const verifyAccount = async (user_id: string, token: string) => {
    const res = axios.post(`${backendUrl}email/templates/verify_account.php`, {
        user_id: user_id,
        token: token
    });
    return await res;
};

export const sendVerificationEmailAgain = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = axios.post(`${backendUrl}email/templates/verify_account_again.php`, {},{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response;
}