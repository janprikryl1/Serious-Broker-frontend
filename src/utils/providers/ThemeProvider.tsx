import {createContext, useContext, useState, useEffect, ReactNode, useCallback, FC} from 'react';
import {SkeletonTheme} from "react-loading-skeleton";

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
        if (theme && theme === 'dark') {
            updateThemeColor('light');
        } else {
            updateThemeColor('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <SkeletonTheme baseColor={"var(--tertiary-color)"} highlightColor={"var(--secondary-color)"}>
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
