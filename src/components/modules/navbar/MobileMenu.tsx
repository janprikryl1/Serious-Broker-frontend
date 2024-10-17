import {FC} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {ThemeSwitchIcon} from "../../../headerIcons/themeSwitch/ThemeSwitchIcon.tsx";
import {AchievementIcon} from "../../../headerIcons/AchievementIcon.tsx";
import {useTranslation} from "react-i18next";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

type Props = {
    toggleMobileMenu: () => void
}

export const MobileMenu:FC<Props> = ({toggleMobileMenu}) => {
    const {t} = useTranslation();
    const { theme } = useThemeContext();
    
    return (
        <div className="mobile-menu" style={{backgroundColor: theme === 'dark' ? "#393735" : "#f5f8fb"}}>
            <ul className="mobile-menu-list">
                <li>
                    <Link to={routes.articles} onClick={toggleMobileMenu} className="link-underline-none">{t("Articles")}</Link>
                </li>
                <li>
                    <Link to={routes.graphs} onClick={toggleMobileMenu} className="link-underline-none">{t("Graphs")}</Link>
                </li>
                <li>
                    <Link to={routes.contact} onClick={toggleMobileMenu} className="link-underline-none">{t("Contact")}</Link>
                </li>
                <li>
                    <ThemeSwitchIcon/>
                </li>
                <li>
                    <AchievementIcon/>
                </li>
            </ul>
        </div>
    );
}