import { FC } from "react";
import { Link } from "react-router-dom";
import { registeredUserNavbarURLs, notRegisteredUserNavbarURLs } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";

type Props = {
    toggleMobileMenu: () => void;
};

export const MobileMenu: FC<Props> = ({ toggleMobileMenu }) => {
    const { t } = useTranslation();
    const { user } = useUserContext();

    const menuLinks = user ? registeredUserNavbarURLs : notRegisteredUserNavbarURLs;

    return (
        <div className="mobile-menu">
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
            </ul>
        </div>
    );
};
