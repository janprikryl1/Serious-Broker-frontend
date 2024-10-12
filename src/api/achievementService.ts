import axios from "axios";
import {backendUrl} from "../env.ts";
import {AchievementType} from "../utils/types/AchievementType.ts";

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