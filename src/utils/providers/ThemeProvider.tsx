import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback} from 'react';
import {useLocation} from "react-router-dom";
import {SkeletonTheme} from "react-loading-skeleton";

type ThemeContextType = {
    theme: string | null;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const location = useLocation();


    const updateThemeColor = useCallback((themeMode: 'light' | 'dark' = 'light') => {
        document.documentElement.setAttribute('data-bs-theme', themeMode);
        localStorage.setItem('theme', themeMode);
        setTheme(themeMode);
    }, []);

    useEffect(() => {
        updateThemeColor(theme as 'light' | 'dark');
    }, [location.search, updateThemeColor]);

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme && theme === 'dark') {
            updateThemeColor('light');
        } else {
            updateThemeColor('dark');
        }
    };

  

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <SkeletonTheme baseColor={theme === "dark" ? "#303030" : "#A0A0A0"} highlightColor={theme === "dark" ? "#444" : "#F0F0F0"}>
                {children}
            </SkeletonTheme>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
