import { api } from "@/utils/api/axiosInstance.ts"
import type { AchievementType } from "@/utils/types/achievement.ts"

export const adminUserAchievements = async (
  userId: number
): Promise<AchievementType[]> => {
  const res = await api.get<AchievementType[]>(
    "achievement/achivments-list.php",
    {
      params: { user_id: userId },
    }
  )
  return res.data
}

export const adminAddAchievement = async (
  userId: number,
  achievementText: string
): Promise<AchievementType> => {
  const res = await api.post<AchievementType>(
    "achievement/achivments-list.php",
    {
      user_id: userId,
      text: achievementText,
    }
  )
  return res.data
}

export const giveAchievementsForLongPeriod = async () => {
  const res = await api.get("achievement/give_achievments.php")
  return res.data
}
