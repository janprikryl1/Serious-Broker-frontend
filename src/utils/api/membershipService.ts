import axios from "axios";
import {backendUrl} from "../../env.ts";
import {MembershipTypes} from "../types/user/userTypes.ts";

export const getMemberships = async () => {
    return await axios.get<MembershipTypes[]>(`${backendUrl}membership/get_user_membership.php`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getMembershipByUserId = async (userId: number) => {
    return await axios.get<MembershipTypes[]>(`${backendUrl}membership/get_membership_by_user_id.php`, {
        params: {
            user_id: userId,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

export const addMembership = async (userId: number, price: number, dateTimeEnd: string) => {
    return await axios.post<MembershipTypes>(`${backendUrl}membership/update_user_membership.php`, {
        user_id: userId,
        price,
        date_time_end: dateTimeEnd,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

export const editMembership = async (userId: number, membershipId: number, price: number, dateTimeEnd: string) => {
    return await axios.put<MembershipTypes>(`${backendUrl}membership/update_user_membership.php`, {
        user_id: userId,
        membership_id: membershipId,
        price,
        date_time_end: dateTimeEnd,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}