import {createContext, useContext, useState, useEffect, ReactNode, useCallback, FC} from 'react';
import {SkeletonTheme} from "react-loading-skeleton";
import {captureEvent} from "../posthog.ts";

type ThemeContextType = {
    theme: string | null;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const updateThemeColor = useCallback((themeMode: 'light' | 'dark' = 'dark') => {
        document.documentElement.setAttribute('data-bs-theme', themeMode);
        localStorage.setItem('theme', themeMode);
        setTheme(themeMode);
    }, []);
    
    useEffect(() => {
        /*if ("theme" in localStorage) {
            updateThemeColor(localStorage.getItem('theme') as 'light' | 'dark');
        } else {*/
            updateThemeColor("dark");
        //}
    }, []);

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');
        const nextTheme = theme && theme === 'dark' ? 'light' : 'dark';
        updateThemeColor(nextTheme);
        captureEvent('theme_toggled', { theme: nextTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <SkeletonTheme baseColor={"var(--quaternary-color)"} highlightColor={"color-mix(in srgb, var(--secondary-color) 10%, transparent)"}>
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
