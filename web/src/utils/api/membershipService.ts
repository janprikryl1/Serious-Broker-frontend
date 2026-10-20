import { api } from "./axiosInstance.ts";
import {MembershipTypes} from "../types/user/userTypes.ts";

/*
 * `getMembershipByUserId`, `addMembership` a `editMembership` se přesunuly do
 * projektu `admin` (admin/src/utils/api/membershipService.ts) spolu se správou
 * uživatelů, odkud se jako jediné volaly.
 *
 * `getMemberships` tady zůstává — čte si ji přihlášený uživatel na
 * `ProfileMembership`.
 */

export const getMemberships = async () => {
    return await api.get<MembershipTypes[]>(`membership/get_user_membership.php`);
};
