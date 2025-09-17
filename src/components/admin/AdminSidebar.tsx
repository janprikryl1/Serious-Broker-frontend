import {FC, useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { CiLogout } from "react-icons/ci";
import { FaBars, FaUsersCog } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { MdOutlineScreenshotMonitor, MdOutlineSdStorage, MdOutlineSubscriptions } from "react-icons/md";
import { SiDictionarydotcom } from "react-icons/si";
import { FiDatabase } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { GrAchievement } from "react-icons/gr";
import { RiCoinsLine } from "react-icons/ri";
import {FaTable} from "react-icons/fa6";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {adminURLS, routes} from "../../utils/constants";
import {UserRole} from "../../utils/types/user/userTypes.ts";
import {CgDatabase} from "react-icons/cg";
import {TbForms} from "react-icons/tb";

export const AdminSidebar: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
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
    
    useEffect(() => {
        if (user === undefined || !(user?.role === UserRole.Admin || user?.role === UserRole.Manager)) {
            navigate(routes.home);
        }
    }, [user]);

    return (
        <>
            <button className="mobile-sidebar-toggle" onClick={toggleMobileSidebar}>
                <FaBars />
            </button>

            <ProSidebar
                collapsed={collapsed}
                className={`custom-sidebar ${mobileVisible ? "mobile-visible" : ""}`}
                backgroundColor="#333"
                style={{position:"absolute"}}
            >
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                color: disabled ? "#eee" : "#0A0704",
                                backgroundColor: active ? "#B1974E" : undefined,
                                "&:hover": {
                                    backgroundColor: "#B1974E !important",
                                    color: "#0A0704 !important",
                                    borderRadius: "8px !important",
                                    fontWeight: "bold !important"
                                },
                                [`&.active`]: {
                                    backgroundColor: '#B1974E',
                                    color: '#0A0704',
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
                    {user!.role === UserRole.Admin && (
                        <MenuItem icon={<FaUsersCog />} component={<NavLink to={adminURLS.users} />} className="sidebar-item">
                            {t("User management")}
                        </MenuItem>
                    )}
                    <MenuItem icon={<MdOutlineSubscriptions />} component={<NavLink to={adminURLS.newsletter} />} className="sidebar-item">
                        {t("Newsletter management")}
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
                    <MenuItem icon={<FaTable />} component={<NavLink to={adminURLS.binanceIndexAbout} />} className="sidebar-item">
                        {t("binance_index About")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineSdStorage />} component={<NavLink to={adminURLS.chachedData} />} className="sidebar-item">
                        {t("Chached data")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineScreenshotMonitor />} component={<NavLink to={adminURLS.demos} />} className="sidebar-item">
                        {t("Demos")}
                    </MenuItem>
                    <MenuItem icon={<CgDatabase />} component={<NavLink to={adminURLS.genericTableData} />} className="sidebar-item">
                        {t("Generic data")}
                    </MenuItem>
                    <MenuItem icon={<TbForms />} component={<NavLink to={adminURLS.forms} />} className="sidebar-item">
                        {t("Forms")}
                    </MenuItem>
                    <MenuItem icon={<CiLogout />} onClick={logout} className="sidebar-item">
                        {t("Logout")}
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
};
