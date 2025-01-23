import {FC} from "react";
import Moon from "../../utils/icons/header/moon.svg";
import Sun from "../../utils/icons/header/sun.svg";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";

export const ThemeSwitchIcon:FC = () => {
    const {theme, toggleTheme} = useThemeContext();
    
    return (
        <div style={{marginRight: "1vw"}} onClick={toggleTheme}>
            <img
                src={theme === "dark" ? Moon : Sun}
                alt="light-dark-switchbtn"
                width={20}
            />
        </div>
    )
}