import { api } from "./axiosInstance.ts";
import {SessionType} from "../types/user/sessionType.ts";

export const getProfileSessions = async () => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await api.get<SessionType[]>("user/sessions/get_user_sessions.php");
};

export const logoutSession = async (sessionId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.delete(`user/sessions/logout.php`, {
        
        data: { id: sessionId }
    });
};

export const logoutEverywhere = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    await api.delete(`user/sessions/logout_everywhere.php`);
};