import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
    headerClass?: string;
}

export const Header: React.FC<HeaderProps> = ({ headerClass = null }) => {
    const [menu, setMenu] = useState<boolean>(false);
    const [scrollTop, setScrollTop] = useState<number>(0);

    const location = useLocation();

    const changeImage = useCallback((themeMode: 'light' | 'dark' = 'light') => {
        const icon = document.querySelector('#btnSwitch img') as HTMLImageElement;

        if (themeMode === 'dark') {
            icon.src = 'images/icon/sun.svg';
            const images = document.querySelectorAll('img.dark') as NodeListOf<HTMLImageElement>;

            images.forEach((image) => {
                let oldSrc = image.src;
                oldSrc = oldSrc.replace("-dark.", ".");
                const oldIndex = oldSrc.lastIndexOf(".");
                const baseName = oldSrc.slice(0, oldIndex);
                const extension = oldSrc.slice(oldIndex);
                const newSrc = baseName + "-dark" + extension;
                image.src = newSrc;
            });
        } else {
            icon.src = 'images/icon/moon.svg';
            const images = document.querySelectorAll('img.dark') as NodeListOf<HTMLImageElement>;

            images.forEach((image) => {
                const oldSrc = image.src;
                const newSrc = oldSrc.replace("-dark.", ".");
                image.src = newSrc;
            });
        }
    }, []);

    const updateThemeColor = useCallback((themeMode: 'light' | 'dark' = 'light') => {
        const colorSwitcher = document.getElementById('btnSwitch');

        document.documentElement.setAttribute('data-bs-theme', themeMode);
        localStorage.setItem('theme', themeMode);

        if (themeMode === 'dark') {
            colorSwitcher?.classList.add('dark-switcher');
        } else {
            colorSwitcher?.classList.remove('dark-switcher');
        }

        changeImage(themeMode);
    }, [changeImage]);

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');

        if (theme && theme === 'dark') {
            updateThemeColor('light');
        } else {
            updateThemeColor('dark');
        }
    };

    function switchThemeByUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const theme = urlParams.get('theme');

        if (theme) {
            localStorage.setItem('theme', theme);
        }
    }

    useEffect(() => {
        switchThemeByUrl();
        const theme = localStorage.getItem('theme');
        updateThemeColor(theme as 'light' | 'dark');
    }, [location.search, updateThemeColor]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY);
            const header = document.querySelector('.header-section');
            if (header) {
                window.scrollY >= 250
                    ? header.classList.add('header-fixed', 'fadeInUp')
                    : header.classList.remove('header-fixed', 'fadeInUp');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollTop]);

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
        event.preventDefault();
        const mediaQuery = window.matchMedia('(max-width: 991px)');

        if (mediaQuery.matches) {
            const target = event.currentTarget.parentElement as HTMLElement;
            target.classList.toggle('open');
            const submenu = target.nextElementSibling as HTMLElement;
            if (submenu) {
                submenu.style.display = submenu.style.display === 'none' || !submenu.style.display ? 'block' : 'none';
            }
        }
    };

    return (
        <>
            <div className="lightdark-switch" onClick={toggleTheme}>
        <span className="switch-btn" id="btnSwitch">
          <img
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src="images/icon/moon.svg"
              alt="light-dark-switchbtn"
              className="swtich-icon"
          />
        </span>
            </div>

            <header className={`header-section ${headerClass ? headerClass : 'bg-color-3'}`}>
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper">
                            <div className="logo">
                                <Link to="/">
                                    <img className="dark" src="/images/logo/symbol.svg" alt="logo" />
                                </Link>
                            </div>
                            <div className="menu-area">
                                <ul id="menu" className={`menu menu--style1 ${menu ? 'active' : ''}`}>
                                    <li className="megamenu menu-item-has-children">
                                        <Link to="/#0" onClick={toggleActive}>Demos</Link>
                                        <ul className="submenu">
                                            <li>
                                                <div className="home-showcase">
                                                    <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                                        <div className="col order-first">
                                                            <div className="home-showcase__item">
                                                                <div className="home-showcase__image">
                                                                    <img src="images/demo/1.png" alt="home-showcase" />
                                                                    <div className="home-showcase__buttons">
                                                                        <Link
                                                                            to={{ pathname: '/', search: '?theme=light' }}
                                                                            className="trk-btn trk-btn--primary home-showcase__buttons-item mt-3"
                                                                        >
                                                                            <span>Preview</span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <h3 className="home-showcase__title">
                                                                    <Link
                                                                        to={{ pathname: '/', search: '?theme=light' }}
                                                                    >
                                                                        Stock Trading
                                                                    </Link>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="home-showcase__item">
                                                                <div className="home-showcase__image">
                                                                    <img src="images/demo/1-dark.png" alt="home-showcase" />
                                                                    <div className="home-showcase__buttons">
                                                                        <Link
                                                                            to={{ pathname: '/', search: '?theme=dark' }}
                                                                            className="trk-btn trk-btn--primary home-showcase__buttons-item mt-3"
                                                                        >
                                                                            <span>Preview</span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <h3 className="home-showcase__title">
                                                                    <Link
                                                                        to={{ pathname: '/', search: '?theme=dark' }}
                                                                    >
                                                                        Stock Trading Dark
                                                                    </Link>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <Link to="/services" onClick={toggleActive}>Services</Link>
                                        <ul className="submenu">
                                            <li><Link to="/services">Services</Link></li>
                                            <li><Link to="/service-details">Services Details</Link></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <Link to="/#0" onClick={toggleActive}>About</Link>
                                        <ul className="submenu">
                                            <li><Link to="/about">About Us</Link></li>
                                            <li><Link to="/price">Price</Link></li>
                                            <li><Link to="/team">Team</Link></li>
                                            <li><Link to="/team-2">Team 2</Link></li>
                                            <li><Link to="/team-details">Team Details</Link></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children">
                                        <Link to="/#0" onClick={toggleActive}>Pages</Link>
                                        <ul className="submenu">
                                            <li><Link to="blogs">Blogs</Link></li>
                                            <li><Link to="blog-sidebar">Blog - Side Bar</Link></li>
                                            <li><Link to="blog-details">Blog Details</Link></li>
                                            <li><Link to="signup">Sign Up</Link></li>
                                            <li><Link to="signup-2">Sign Up 2</Link></li>
                                            <li><Link to="signin">Sign In</Link></li>
                                            <li><Link to="signin-2">Sign In 2</Link></li>
                                            <li><Link to="forgot-pass">Reset Password</Link></li>
                                            <li><Link to="forgot-pass-2">Reset Password 2</Link></li>
                                            <li><Link to="404">404 Error</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="contact">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="header-action">
                                <div className="menu-area">
                                    <div className="header-btn">
                                        <Link to="signup" className="trk-btn trk-btn--border trk-btn--primary">
                                            <span>Join Now</span>
                                        </Link>
                                    </div>
                                    <div
                                        className={menu ? "header-bar d-lg-none header-bar--style1 active" : "header-bar d-lg-none header-bar--style1"}
                                        onClick={toggleMenu}
                                    >
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
        </>
    );
};
