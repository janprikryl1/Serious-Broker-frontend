import { api } from "./axiosInstance.ts";
import {MembershipTypes} from "../types/user/userTypes.ts";

export const getMemberships = async () => {
    return await api.get<MembershipTypes[]>(`membership/get_user_membership.php`);
};

export const getMembershipByUserId = async (userId: number) => {
    return await api.get<MembershipTypes[]>(`membership/get_membership_by_user_id.php`, {
        params: {
            user_id: userId,
        }
    });
}

export const addMembership = async (userId: number, price: number, dateTimeEnd: string) => {
    return await api.post<MembershipTypes>(`membership/update_user_membership.php`, {
        user_id: userId,
        price,
        date_time_end: dateTimeEnd,
    });
}

export const editMembership = async (userId: number, membershipId: number, price: number, dateTimeEnd: string) => {
    return await api.put<MembershipTypes>(`membership/update_user_membership.php`, {
        user_id: userId,
        membership_id: membershipId,
        price,
        date_time_end: dateTimeEnd,
    });
}