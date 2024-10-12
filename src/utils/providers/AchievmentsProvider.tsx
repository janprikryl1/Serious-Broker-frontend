import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {AchievementType} from "../types/AchievementType.ts";
import {getAchievements, markReadAchievment} from "../../api/achievementService.ts";

type AchievmentsContextType = {
    achievements: AchievementType[];
    unreadAchievements: AchievementType[];
    markAchievementAsRead: (id: number) => Promise<void>;
}

const AchievmentContext = createContext<AchievmentsContextType | undefined>(undefined);

export const AchievmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [achievements, setAchievements] = useState<AchievementType[]>([]);
    const [unreadAchievements, setUnreadAchievements] = useState<AchievementType[]>([]);

    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const result = await getAchievements();
                if (!result) return;
                setAchievements(result.data);
                setUnreadAchievements(result.data.filter((achievement) => achievement.read == 0));
            } catch (error) {
                console.error(error);
            }
        };
        loadAchievements();
    }, []);
    
    const markAchievementAsRead = async (id: number) => {
        try {
            const result = await markReadAchievment(id);
            if (!result) return;
            setAchievements(result.data);
            setUnreadAchievements(result.data.filter((achievement) => achievement.read == 0));
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <AchievmentContext.Provider value={{ achievements, unreadAchievements, markAchievementAsRead }}>{children}</AchievmentContext.Provider>
    );
};

export const useAchievmentsContext = () => {
    const context = useContext(AchievmentContext);
    if (!context) {
        throw new Error('useAchievmentsContext must be used within a AchievmentsProvider');
    }
    return context;
};
