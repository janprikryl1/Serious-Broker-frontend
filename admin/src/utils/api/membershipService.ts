import { api } from "@/utils/api/axiosInstance.ts"
import type { MembershipTypes } from "@/utils/types/membership.ts"

export const getMembershipByUserId = async (userId: number) => {
  const response = await api.get<MembershipTypes[]>(
    "membership/get_membership_by_user_id.php",
    { params: { user_id: userId } }
  )
  return response.data
}

export const addMembership = async (
  userId: number,
  price: number,
  dateTimeEnd: string
) => {
  const response = await api.post<MembershipTypes>(
    "membership/update_user_membership.php",
    { user_id: userId, price, date_time_end: dateTimeEnd }
  )
  return response.data
}

export const editMembership = async (
  userId: number,
  membershipId: number,
  price: number,
  dateTimeEnd: string
) => {
  const response = await api.put<MembershipTypes>(
    "membership/update_user_membership.php",
    {
      user_id: userId,
      membership_id: membershipId,
      price,
      date_time_end: dateTimeEnd,
    }
  )
  return response.data
}
