import { FC } from "react";
import { Link } from "react-router-dom";
import { registeredUserNavbarURLs, notRegisteredUserNavbarURLs } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";

export const NavbarDesktopMenu: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();

    return (
        <div className="menu-area d-none d-lg-flex align-items-center">
            <ul className="menu menu--style1 d-flex align-items-center">
                {user ? (
                    Object.keys(registeredUserNavbarURLs).map((key) => {
                        const item = registeredUserNavbarURLs[key];

                        if ("subLinks" in item) {
                            return (
                                <li className="menu-item-has-children mr-2" key={key}>
                                    <Link to={item.subLinks.graphs.link} className="link-underline-none">
                                        {t(item.title)}
                                    </Link>
                                    <ul className="submenu">
                                        {Object.keys(item.subLinks).map((subKey) => (
                                            <li key={subKey}>
                                                <Link to={item.subLinks[subKey].link} className="link-underline-none">
                                                    {t(item.subLinks[subKey].title)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        } else {
                            return (
                                <li className="mr-2" key={key}>
                                    <Link to={item.link} className="link-underline-none">
                                        {t(item.title)}
                                    </Link>
                                </li>
                            );
                        }
                    })
                ) : (
                    Object.keys(notRegisteredUserNavbarURLs).map((key) => {
                        const item = notRegisteredUserNavbarURLs[key];
                        return (
                            <li className="mr-2" key={key}>
                                <Link to={item.link} className="link-underline-none">
                                    {t(item.title)}
                                </Link>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
};
