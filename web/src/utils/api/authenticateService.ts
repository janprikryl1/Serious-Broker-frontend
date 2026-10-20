import { api } from "./axiosInstance.ts";
import {UserType} from "../types/user/userTypes.ts";
import {loginType} from "../types/user/loginType.ts";
import {registerUserType, registerUserTypeResponse} from "../types/user/registerUserType.ts";
import {ZeruhResponse} from "../types/user/verifyEmailType.ts";

export const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.get<{status: string;admin: boolean;user: UserType}>("user/is_authenticated.php");
}

export const login = async (formData: loginType) => {
    const response = await api.post<registerUserTypeResponse>("user/login.php", formData);
    const token = response.data.token;
    if (token)
        localStorage.setItem("token", token);
    return response;
}

export const register = async (formData: registerUserType) => {
    const response = await api.post<registerUserTypeResponse>("user/register.php", formData);
    const token = response.data.token;
    localStorage.setItem("token", token);

    return response.data;
}

export const verifyEmail = async (email: string) => {
    return await api.get<ZeruhResponse>("email/verify_email.php", {
        params: {
            email
        }
    });
}


export const updateUserDetails = async (userDetails: UserType) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await api.put<registerUserTypeResponse>("user/update_user_details.php",
        userDetails);
}