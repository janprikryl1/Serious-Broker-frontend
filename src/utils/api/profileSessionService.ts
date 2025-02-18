import axios from "axios";
import {backendUrl} from "../../env.ts";
import {SessionType} from "../types/user/sessionType.ts";

export const getProfileSessions = async () => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get<SessionType[]>(backendUrl + "user/sessions/get_user_sessions.php", {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
};

export const logoutSession = async (sessionId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.delete(`${backendUrl}user/sessions/logout.php`, {
        headers: {
            Authorization2: `Bearer ${token}`
        },
        data: { id: sessionId }
    });
};

export const logoutEverywhere = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    await axios.delete(`${backendUrl}user/sessions/logout_everywhere.php`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
};