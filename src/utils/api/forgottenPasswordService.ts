import { api } from "./axiosInstance.ts";

export const sendForgottenPassword = async (email: string) => {
    const res = api.post(`email/templates/send_new_password_link.php`, {
        email: email
    });
    return await res;
}

export const verifySecureKeys = async (key_0: string, key_1: string, user_id: number) => {
    const res = api.post(`email/templates/verify_new_password_tokens.php`, {
        user_id: user_id,
        key_0: key_0,
        key_1: key_1
    });
    return await res;
}

export const setSubmitNewPassword = async (key_0: string, key_1: string, user_id: number, new_password: string) => {
    const res = api.post(`email/templates/set_new_password.php`, {
        user_id: user_id,
        key_0: key_0,
        key_1: key_1,
        new_password: new_password
    });
    return await res;
}