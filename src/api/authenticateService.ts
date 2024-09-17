import axios from "axios";

import {loginType} from "../utils/types/user/loginType";
import {registerUserType, registerUserTypeResponse} from "../utils/types/user/registerUserType";
import {backendUrl} from "../env.ts";
import {UserType} from "../utils/types/user/userTypes.ts";

export const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = axios.get<{status: string;admin: boolean;user: UserType}>(backendUrl + "user/is_authenticated.php", {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });

    return await response;
}

export const login = async (formData: loginType) => {
    const response = await axios.post<registerUserTypeResponse>(backendUrl + "user/login.php", formData);
    const token = response.data.token;
    if (token)
        localStorage.setItem("token", token);
    return response;
}

export const register = async (formData: registerUserType) => {
    const response = await axios.post<registerUserTypeResponse>(backendUrl + "user/register.php", formData);
    const token = response.data.token;
    localStorage.setItem("token", token);

    return response.data;
}


export const isAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return {status: "success", admin: false};

    const response = await axios.get<{status: string;admin: boolean}>(backendUrl + "isAdminAPI", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
