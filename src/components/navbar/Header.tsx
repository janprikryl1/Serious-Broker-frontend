import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu.tsx";
import Logo from "../../utils/icons/logo/SB_only.svg";
import { MobileMenu } from "./MobileMenu.tsx";
import {useMediaQuery} from "@mui/material";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {routes} from "../../utils/constants";
import {ChangeLanguageIcon} from "./headerIcons/languageSwitchIcon/ChangeLanguageIcon.tsx";
import {SignUpIcon} from "./headerIcons/SignUpIcon.tsx";
import {SignInIcon} from "./headerIcons/SignInIcon.tsx";

export const Header: FC = () => {
    const { user } = useUserContext();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:768px)');

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header>
            <div className="header-wrapper">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="logo">
                                <Link to={routes.home}>
                                    <img className="logo-dark" src={Logo} alt="logo"/>
                                </Link>
                            </div>
                            <NavbarDesktopMenu />
                        </div>

                        <div className="d-flex align-items-center flex-nowrap">
                            <div className="mx-2 mobile-hide">
                                <ChangeLanguageIcon/>
                            </div>
                            {!user && !isMobile && (
                                <div className="border-start px-3" style={{ color: "white", fontWeight: "bold" }}>
                                    <SignUpIcon/>
                                </div>
                            )}
                            <div className="mx-2">
                                <SignInIcon/>
                            </div>
                            <div className="header-bar" onClick={toggleMobileMenu} style={{ padding: 10 }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}
        </header>
    );
};
