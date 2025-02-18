import axios from "axios";
import {backendUrl} from "../../env.ts";
import {AchievementType} from "../types/AchievementType.ts";

export const getAchievements = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = axios.get<AchievementType[]>(backendUrl + "/achievement/achievements.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
    });
    return await response;
};

export const markReadAchievment = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await axios.post<AchievementType[]>(backendUrl + "achievement/mark-read.php",
            {
                id: id,
            },
            {
                headers: {
                    Authorization2: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Failed to mark achievement as read", error);
        return null;
    }
};

export const adminUserAchievements = async (userId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = axios.get<AchievementType[]>(backendUrl + "achievement/achivments-list.php",
        {
            headers: {
                Authorization2: `Bearer ${token}`,
            },
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
    
    const response = await axios.post<AchievementType>(backendUrl + "achievement/achivments-list.php", 
        {
                user_id: userId,
                text: achievmentText,
            },
            {
                headers: {
                    Authorization2: `Bearer ${token}`,
                },
            }
        );
    return response;
};