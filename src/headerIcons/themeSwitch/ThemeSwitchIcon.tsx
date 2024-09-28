import {FC} from "react";
import Moon from "../../utils/icons/icon/moon.svg";
import Sun from "../../utils/icons/icon/sun.svg";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";

export const ThemeSwitchIcon:FC = () => {
    const {theme, toggleTheme} = useThemeContext();
    
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