import React, {createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction} from 'react';
import { AchievementType } from '../types/AchievementType.ts';
import { getAchievements, markReadAchievment } from '../../api/achievementService.ts';
import { AchievmentAnimation } from '../../components/achievment/AchievmentAnimation.tsx';
import {useUserContext} from "./providerUser.tsx";

type AchievmentsContextType = {
    achievements: AchievementType[];
    setAchievements: Dispatch<SetStateAction<AchievementType[]>>;
    unreadAchievements: AchievementType[];
    markAchievementAsRead: (id: number) => Promise<void>;
};

const AchievmentContext = createContext<AchievmentsContextType | undefined>(undefined);

export const AchievmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {user} = useUserContext();
    const [achievements, setAchievements] = useState<AchievementType[]>([]);
    const [unreadAchievements, setUnreadAchievements] = useState<AchievementType[]>([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [prevUnreadCount, setPrevUnreadCount] = useState(0);

    useEffect(() => {
        if (!user?.id) return;
        const loadAchievements = async () => {
            try {
                const result = await getAchievements();
                if (!result) return;
                setAchievements(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadAchievements();
        const intervalId = setInterval(() => {
            loadAchievements();
        }, 60000); // 60000 ms = 1 minute
        return () => clearInterval(intervalId); 
    }, [prevUnreadCount, user?.id]);

    useEffect(() => {
        if (!achievements || achievements.length === 0 || !user?.id) return;
        console.log(achievements);
        const newUnread = achievements.filter((achievement) => achievement.read == 0);
        setUnreadAchievements(newUnread);
        if (newUnread.length > prevUnreadCount) {
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 11000);
        }
        setPrevUnreadCount(newUnread.length);
    }, [achievements]);

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
    
    const handleMarkLastAchievementAsRead = async () => {
        if (unreadAchievements[0] !== null) {
            await markAchievementAsRead(unreadAchievements[0].id);
        }
    };

    return (
        <AchievmentContext.Provider value={{ achievements, setAchievements, unreadAchievements, markAchievementAsRead }}>
            {children}
            {showAnimation && <AchievmentAnimation onClose={handleMarkLastAchievementAsRead}/>}
        </AchievmentContext.Provider>
    );
};

export const useAchievmentsContext = () => {
    const context = useContext(AchievmentContext);
    if (!context) {
        throw new Error('useAchievmentsContext must be used within a AchievmentsProvider');
    }
    return context;
};
