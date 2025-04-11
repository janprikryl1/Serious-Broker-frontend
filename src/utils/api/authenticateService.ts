import axios from "axios";
import {backendUrl} from "../../env.ts";
import {UserType} from "../types/user/userTypes.ts";
import {loginType} from "../types/user/loginType.ts";
import {registerUserType, registerUserTypeResponse} from "../types/user/registerUserType.ts";

export const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.get<{status: string;admin: boolean;user: UserType}>(backendUrl + "user/is_authenticated.php", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
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

export const verifyEmail = async (email: string) => {
    return await axios.get(backendUrl+"email/verify_email.php", {
        params: {
            email
        }
    });
}


export const updateUserDetails = async (userDetails: UserType) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await axios.put<registerUserTypeResponse>(backendUrl + "user/update_user_details.php",
        userDetails, {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
}