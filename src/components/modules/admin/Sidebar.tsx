import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import { useTranslation } from "react-i18next";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { adminURLS } from "../../../utils/constants";
import { CiLogout } from "react-icons/ci";
import { FaBars, FaUsersCog } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { MdOutlineArticle, MdOutlineScreenshotMonitor, MdOutlineSdStorage, MdOutlineSubscriptions } from "react-icons/md";
import { SiDictionarydotcom } from "react-icons/si";
import { FiDatabase } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { GrAchievement } from "react-icons/gr";
import { RiCoinsLine } from "react-icons/ri";

export const Sidebar: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();
    const [collapsed, setCollapsed] = useState(Boolean(localStorage.getItem("sidebarCollapsed") ?? ""));
    const [mobileVisible, setMobileVisible] = useState(false);

    const collapseToggle = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        localStorage.setItem("sidebarCollapsed", newCollapsed.toString());
    };

    const toggleMobileSidebar = () => {
        setMobileVisible(!mobileVisible);
    };

    return (
        <>
            <button className="mobile-sidebar-toggle" onClick={toggleMobileSidebar}>
                <FaBars />
            </button>

            <ProSidebar
                collapsed={collapsed}
                className={`custom-sidebar ${mobileVisible ? "mobile-visible" : ""}`}
                backgroundColor="#333"
            >
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                color: disabled ? "#eee" : "#black",
                                backgroundColor: active ? "#ab9641" : undefined,
                                "&:hover": {
                                    backgroundColor: "#ab9641 !important",
                                    color: "black !important",
                                    borderRadius: "8px !important",
                                    fontWeight: "bold !important"
                                },
                                [`&.active`]: {
                                    backgroundColor: '#ab9641',
                                    color: 'black',
                                },
                            };
                        }
                    },
                }}>
                    <MenuItem
                        icon={<FaBars />}
                        onClick={collapseToggle}
                        className="sidebar-header"
                    >
                        {user && !collapsed ? `${user.firstname} ${user.surname}` : ""}
                    </MenuItem>

                    <MenuItem icon={<IoQrCode />} component={<NavLink to={adminURLS.qr} />} className="sidebar-item">
                        {t("QR")}
                    </MenuItem>
                    <MenuItem icon={<FaUsersCog />} component={<NavLink to={adminURLS.users} />} className="sidebar-item">
                        {t("User management")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineSubscriptions />} component={<NavLink to={adminURLS.newsletter} />} className="sidebar-item">
                        {t("Newsletter management")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineArticle />} component={<NavLink to={adminURLS.articles} />} className="sidebar-item">
                        {t("Article management")}
                    </MenuItem>
                    <MenuItem icon={<SiDictionarydotcom />} component={<NavLink to={adminURLS.glossary} />} className="sidebar-item">
                        {t("Glossary")}
                    </MenuItem>
                    <MenuItem icon={<FiDatabase />} component={<NavLink to={adminURLS.logTable} />} className="sidebar-item">
                        {t("Table logs")}
                    </MenuItem>
                    <MenuItem icon={<VscFeedback />} component={<NavLink to={adminURLS.feedbacks} />} className="sidebar-item">
                        {t("Feedbacks")}
                    </MenuItem>
                    <MenuItem icon={<GrAchievement />} component={<NavLink to={adminURLS.achievements} />} className="sidebar-item">
                        {t("Achievements")}
                    </MenuItem>
                    <MenuItem icon={<RiCoinsLine />} component={<NavLink to={adminURLS.coinSettings} />} className="sidebar-item">
                        {t("Coins")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineSdStorage />} component={<NavLink to={adminURLS.chachedData} />} className="sidebar-item">
                        {t("Chached data")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineScreenshotMonitor />} component={<NavLink to={adminURLS.demos} />} className="sidebar-item">
                        {t("Demos")}
                    </MenuItem>
                    <MenuItem icon={<CiLogout />} onClick={logout} className="sidebar-item">
                        {t("Logout")}
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
};
