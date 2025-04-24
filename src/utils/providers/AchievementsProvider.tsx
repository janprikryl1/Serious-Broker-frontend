import React, {createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, lazy, Suspense} from 'react';
import {useUserContext} from "./providerUser.tsx";
import {useTranslation} from "react-i18next";
import {getAchievements, markReadAchievment} from "../api/achievementService.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {AchievementType} from "../types/user/AchievementType.ts";
const AchievementAnimation = lazy(() => import('../../components/achievment/AchievementAnimation.tsx').then(module => ({ default: module.AchievementAnimation })));

type AchievementsContextType = {
    achievements: AchievementType[];
    setAchievements: Dispatch<SetStateAction<AchievementType[]>>;
    unreadAchievements: AchievementType[];
    markAchievementAsRead: (id: number) => Promise<void>;
};

const AchievementContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const {t} = useTranslation();
    const {user, setUser} = useUserContext();
    const [achievements, setAchievements] = useState<AchievementType[]>([]);
    const [unreadAchievements, setUnreadAchievements] = useState<AchievementType[]>([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [prevUnreadCount, setPrevUnreadCount] = useState(0);

    useEffect(() => {
        if (!user?.id) return;
        const loadAchievements = async () => {
            try {
                const result = await getAchievements();
                if (!result || result.status !== 200) return;
                setAchievements(result.data);
            } catch (error: any) {
                console.error(error);
                setAchievements([]);
                if (error.response.status === 401) {
                    setUser(undefined);
                }
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
            try {
            const result = await markReadAchievment(id);
            if (!result) return;
            setAchievements(result.data);
            setUnreadAchievements(result.data.filter((achievement) => achievement.read == 0));
            } catch (e) {
                CustomSwal.fire({
                    icon: 'error',
                    title: t('Error'),
                    text: t('Error while deleting achievement'),
                });
                console.error(e);
            }
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
        <AchievementContext.Provider value={{ achievements, setAchievements, unreadAchievements, markAchievementAsRead }}>
            {children}
            {showAnimation && <Suspense fallback={t("Loading...")}><AchievementAnimation onClose={handleMarkLastAchievementAsRead}/></Suspense>}
        </AchievementContext.Provider>
    );
};

export const useAchievementsContext = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievementsContext must be used within a AchievementsProvider');
    }
    return context;
};
