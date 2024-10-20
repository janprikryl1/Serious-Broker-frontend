import axios from "axios";
import {backendUrl} from "../env.ts";

export const verifyAccount = async (user_id: string) => {
    const res = axios.post(`${backendUrl}/email/verify_account.php`, {
        user_id: user_id
    });
    return await res;
}