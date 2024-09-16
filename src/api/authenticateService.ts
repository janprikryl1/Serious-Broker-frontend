/*import axios from "axios";
import {isAdminAPI, loginAPI, registerAPI} from "../utils/constants";
import {loginType} from "../utils/types/user/loginType";
import {registerUserType, registerUserTypeResponse} from "../utils/types/user/registerUserType";

export const login = async (formData: loginType) => {
    const response = await axios.post<registerUserTypeResponse>(loginAPI, formData);

    const token = response.data.authorisation.token;

    localStorage.setItem("token", token);
}

export const register = async (formData: registerUserType) => {
    const response = await axios.post<registerUserTypeResponse>(registerAPI, formData);

    const token = response.data.authorisation.token;
    localStorage.setItem("token", token);

    return response.data;
}


export const isAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return {status: "success", admin: false};

    const response = await axios.get<{status: string;admin: boolean}>(isAdminAPI, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}
*/