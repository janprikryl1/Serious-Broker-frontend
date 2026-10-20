import { api } from "./axiosInstance.ts";
import {AchievementType} from "../types/user/AchievementType.ts";

export const getAchievements = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = api.get<AchievementType[]>("/achievement/achievements.php");
    return await response;
};

export const markReadAchievment = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await api.post<AchievementType[]>("achievement/mark-read.php",
            {
                id: id,
            });
        return response;
    } catch (error) {
        console.error("Failed to mark achievement as read", error);
        return null;
    }
};

export const adminUserAchievements = async (userId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = api.get<AchievementType[]>("achievement/achivments-list.php",
        {
            
            params: {
                user_id: userId,
            },
        }
    );
    return await response;
};

export const adminAddAchievement = async (userId: number, achievmentText: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = await api.post<AchievementType>("achievement/achivments-list.php", 
        {
                user_id: userId,
                text: achievmentText,
            });
    return response;
};

export const giveAchievmentsForLongPeriod = async () => {
    return await api.get("achievement/give_achievments.php");
}