import axios from "axios";
import {backendUrl} from "../../env.ts";
import {MembershipTypes} from "../types/user/userTypes.ts";

export const getMemberships = async () => {
    const res = axios.get<MembershipTypes[]>(`${backendUrl}membership/get_user_membership.php`, {
        headers: {
            Authorization2: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return await res;
};

export const getMembershipByUserId = async (userId: number) => {
    const res = axios.get<MembershipTypes[]>(`${backendUrl}membership/get_membership_by_user_id.php`, {
        params: {
            user_id: userId,
        },
        headers: {
            Authorization2: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return await res;
}

export const addMembership = async (userId: number, price: number, dateTimeEnd: string) => {
    const res = axios.post<MembershipTypes>(`${backendUrl}membership/update_user_membership.php`, {
        user_id: userId,
        price,
        date_time_end: dateTimeEnd,
    }, {
        headers: {
            Authorization2: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return await res;
}

export const editMembership = async (userId: number, membershipId: number, price: number, dateTimeEnd: string) => {
    const res = axios.put<MembershipTypes>(`${backendUrl}membership/update_user_membership.php`, {
        user_id: userId,
        membership_id: membershipId,
        price,
        date_time_end: dateTimeEnd,
    }, {
        headers: {
            Authorization2: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return await res;
}