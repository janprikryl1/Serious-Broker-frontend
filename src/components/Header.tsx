import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {SignInIcon} from "../headerIcons/SignInIcon.tsx";
import {ThemeSwitchIcon} from "../headerIcons/themeSwitch/ThemeSwitchIcon.tsx";
import {ChangeLanguageIcon} from "../headerIcons/languageSwitchIcon/ChangeLanguageIcon.tsx";
import Logo from "../utils/icons/logo/symbol.svg"
import {useUserContext} from "../utils/providers/providerUser.tsx";

type Props = {
    headerClass?: string;
}

export const Header: React.FC<Props> = ({headerClass = null}) => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    const [menu, setMenu] = useState<boolean>(false);
    const [scrollTop, setScrollTop] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
            const header = document.querySelector('.header-section');
            if (header) {
                if (window.scrollY >= 250) {
                    header.classList.add('header-fixed', 'fadeInUp')
                } else {
                    header.classList.remove('header-fixed', 'fadeInUp');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollTop]);

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    useEffect(()=>{
        setScrollTop(window.scrollY)
    }, [scrollTop])

    const isSticky = (_:  unknown) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        if (!header) return;
        if (scrollTop >= 250) {
            header.classList.add('header-fixed', 'fadeInUp');
        } else {
            header.classList.remove('header-fixed', 'fadeInUp');  
        } 
    };

    const closeAllMenus = () => {
        const elements = document.querySelectorAll(".menu-item-has-children.open") as NodeListOf<HTMLElement>;
        elements.forEach((item) => {
            item.classList.remove('open');
            const submenu = item.querySelector('.submenu') as HTMLElement;
            if (submenu) submenu.style.display = 'none';
        });
    };

    const toggleMenu = () => {
        setMenu(!menu);
        closeAllMenus();
    };

    const toggleActive = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        const mediaQuery = window.matchMedia('(max-width: 991px)');

        if (mediaQuery.matches && event.currentTarget.parentElement) {
            event.currentTarget.parentElement.classList.toggle('open')
            const submenu = event.currentTarget.nextElementSibling as HTMLElement;
            if (!submenu.style.display || submenu.style.display === 'none') {
                submenu.style.display = "block"
            } else {
                submenu.style.display = "none"
            }
        }
    };

    return (
        <header className={`header-section ${headerClass ? headerClass : 'bg-color-3'}`} onScroll={isSticky}>
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="logo">
                            <Link to="/">
                                <img className="dark" src={Logo} alt="logo"/>
                            </Link>
                        </div>
                        <div className="menu-area">
                            <ul id="menu" className={`menu menu--style1 ${menu ? 'active' : ''}`}>
                                <li style={{marginRight: "-10px"}}>
                                    <Link to="/articles" className="none">{t("Articles")}</Link>
                                </li>
                                <li className="menu-item-has-children">
                                    <Link to="/graphs" onClick={toggleActive} className="none">{t("Graphs")}</Link>
                                    <ul className="submenu">
                                        <li><Link to="/recommendation" className="none">{t("Recommendation")}</Link></li>
                                        {user && (
                                            <>
                                                <li><Link to="/assets" className="none">{t("Assets")}</Link></li>
                                                <li><Link to="/most_profitable_assets"
                                                          className="none">{t("Most profitable assets")}</Link></li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                <Link to="contact" className="none">{t("Contact")}</Link>
                                </li>
                                <li>
                                    <ChangeLanguageIcon/>
                                </li>
                                <li>
                                    <ThemeSwitchIcon/>
                                </li>
                                <li>
                                    <SignInIcon/>
                                </li>
                            </ul>
                        </div>
                        <div className="header-action">
                            <div className="menu-area">
                                
                                <div
                                    className={menu ? "header-bar d-lg-none header-bar--style1 active" : "header-bar d-lg-none header-bar--style1"}
                                    onClick={toggleMenu}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
