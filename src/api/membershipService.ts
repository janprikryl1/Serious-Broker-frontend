import axios from "axios";
import {backendUrl} from "../env.ts";
import {MembershipTypes} from "../utils/types/user/userTypes.ts";

export const getMemberships = async () => {
    const res = axios.get<MembershipTypes[]>(`${backendUrl}membership/get_user_membership.php`, {
        headers: {
            Authorization2: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return await res;
};