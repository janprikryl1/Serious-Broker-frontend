/*import axios from "axios";
import {
    MembershipTypes,
    UserMembershipDetails,
    UserTypes,
    UserTypesWithMembership
} from "../utils/types/user/userTypes";
import {adminLoadAllUsersAPI, loginURL, updateUserDetailsAPI, userDetailAPI} from "../utils/constants";
import {useNavigate} from "react-router-dom";

export const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if(!token) return;

    const res = axios.get<UserMembershipDetails>(userDetailAPI,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}

export const updateUserDetails = async (userDetails: UserTypes) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    const res = axios.put<UserMembershipDetails>(updateUserDetailsAPI, userDetails, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}


export const adminLoadAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.get<UserTypesWithMembership[]>(adminLoadAllUsersAPI, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}
*/