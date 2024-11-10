import { FC } from "react";
import { Link } from "react-router-dom";
import { registeredUserNavbarURLs, notRegisteredUserNavbarURLs } from "../../../utils/constants";
import { ThemeSwitchIcon } from "../../../headerIcons/themeSwitch/ThemeSwitchIcon.tsx";
import { AchievementIcon } from "../../../headerIcons/AchievementIcon.tsx";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../utils/providers/ThemeProvider.tsx";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";

type Props = {
    toggleMobileMenu: () => void;
};

export const MobileMenu: FC<Props> = ({ toggleMobileMenu }) => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const { user } = useUserContext();

    const menuLinks = user ? registeredUserNavbarURLs : notRegisteredUserNavbarURLs;

    return (
        <div className="mobile-menu" style={{ backgroundColor: theme === 'dark' ? "#393735" : "#f5f8fb" }}>
            <ul className="mobile-menu-list">
                {Object.keys(menuLinks).map((key) => {
                    const item = menuLinks[key];

                    // Render only the main link for each item, skipping any subLinks
                    return (
                        <li key={key}>
                            <Link
                                to={"subLinks" in item ? item.subLinks.graphs.link : item.link}
                                onClick={toggleMobileMenu}
                                className="link-underline-none"
                            >
                                {t(item.title)}
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <ThemeSwitchIcon />
                </li>
                <li>
                    <AchievementIcon />
                </li>
            </ul>
        </div>
    );
};
