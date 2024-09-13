import {FC, useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Moon from "../../utils/icons/icon/moon.svg";
import Sun from "../../utils/icons/icon/sun.svg";

export const ThemeSwitchIcon:FC = () => {
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
        <div style={{marginRight: "1vw"}} onClick={toggleTheme}>
            <img
                src={theme === "dark" ? Sun : Moon}
                alt="light-dark-switchbtn"
                width={20}
            />
        </div>
    )
}