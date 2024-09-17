import axios from "axios";




export const adminLoadAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.get<[]>("adminLoadAllUsersAPI", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}