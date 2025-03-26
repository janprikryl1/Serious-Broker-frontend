import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { notRegisteredUserNavbarURLs, registeredUserNavbarURLs } from "../../utils/constants";
import { NavDropdown } from "react-bootstrap";

interface NavbarDesktopMenuProps {
    className?: string;
}

export const NavbarDesktopMenu: FC<NavbarDesktopMenuProps> = ({ className }) => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const location = useLocation();

    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        <div className={`menu-area ${className}`}>
            <ul className="menu menu--style1 d-flex align-items-center">
                {user
                    ? Object.keys(registeredUserNavbarURLs).map((key) => {
                        const item = registeredUserNavbarURLs[key];

                        if ("subLinks" in item) {
                            const isDropdownActive = Object.values(item.subLinks).some((sub) =>
                                isActive(sub.link)
                            );

                            return (
                                <li className="me-3" style={{ marginLeft: "20px" }} key={key}>
                                    <NavDropdown
                                        title={t(item.title)}
                                        id={`nav-dropdown-${key}`}
                                        className={isDropdownActive ? "active-yellow" : ""}
                                    >
                                        {Object.keys(item.subLinks).map((subKey) => (
                                            <NavDropdown.Item
                                                as={Link}
                                                to={item.subLinks[subKey].link}
                                                key={subKey}
                                                className={isActive(item.subLinks[subKey].link) ? "active-yellow" : ""}
                                            >
                                                {t(item.subLinks[subKey].title)}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                </li>
                            );
                        } else {
                            return (
                                <li className="mr-2" key={key}>
                                    <Link
                                        to={item.link}
                                        className={`link-underline-none ${isActive(item.link) ? "active-yellow" : ""}`}
                                    >
                                        {t(item.title)}
                                    </Link>
                                </li>
                            );
                        }
                    })
                    : Object.keys(notRegisteredUserNavbarURLs).map((key) => {
                        const item = notRegisteredUserNavbarURLs[key];
                        return (
                            <li className="mr-2" key={key}>
                                <Link
                                    to={item.link}
                                    className={`link-underline-none ${isActive(item.link) ? "active-yellow" : ""}`}
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
