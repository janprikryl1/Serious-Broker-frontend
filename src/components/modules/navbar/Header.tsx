import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {NavbarDesktopMenu} from "./NavbarDesktopMenu.tsx";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";
import {routes} from "../../../utils/constants";
import {ChangeLanguageIcon} from "../../../headerIcons/languageSwitchIcon/ChangeLanguageIcon.tsx";
import {ThemeSwitchIcon} from "../../../headerIcons/themeSwitch/ThemeSwitchIcon.tsx";
import {SignInIcon} from "../../../headerIcons/SignInIcon.tsx";
import {AchievementIcon} from "../../../headerIcons/AchievementIcon.tsx";
import Logo from "../../../utils/icons/logo/symbol.svg";
import {MobileMenu} from "./MobileMenu.tsx";

export const Header: React.FC = () => {
    const { theme } = useThemeContext();
    const [scrollTop, setScrollTop] = useState(0);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
            const header = document.querySelector('.header-section');
            if (header) {
                if (window.scrollY >= 250) {
                    header.classList.add('header-fixed', 'fadeInUp');
                } else {
                    header.classList.remove('header-fixed', 'fadeInUp');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollTop]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className={`header-section ${scrollTop !== 0 && 'bg-color-3'}`}>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper d-flex align-items-center justify-content-between">
                        <div className="logo">
                            <Link to={routes.home}>
                                <img className={theme === "dark" ? "logo-dark" : ""} src={Logo} alt="logo" />
                            </Link>
                        </div>
                        <NavbarDesktopMenu />
                        <div className="d-lg-none">
                            <div className="header-bar header-bar--style1" onClick={toggleMobileMenu}></div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="mx-2 mobile-hide">
                                <ChangeLanguageIcon/>
                            </div>
                            <div className="mx-2 mobile-hide">
                                <ThemeSwitchIcon/>
                            </div>
                            <div className="mx-2">
                                <SignInIcon/>
                            </div>
                            <div className="mx-2 mobile-hide">
                                <AchievementIcon/>
                            </div>
                            <div className="header-bar" onClick={toggleMobileMenu} style={{padding:-10}}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && <MobileMenu toggleMobileMenu={toggleMobileMenu}/>}
        </header>
    );
};
