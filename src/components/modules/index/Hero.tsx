import { FC, useCallback, useEffect, useState } from "react";
import Logo from "../../../utils/icons/logo/symbol.svg";
import LogoSeriousBroker from "../../../utils/icons/logo/LogoSeriousBroker.svg";
import LogoSubtext3 from "../../../utils/icons/logo/Logo - subtext - 3.svg";
import { useLocation } from "react-router-dom";

export const Hero: FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
    const location = useLocation();

    const updateThemeColor = useCallback((themeMode: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-bs-theme', themeMode);
        localStorage.setItem('theme', themeMode);
        setTheme(themeMode);
    }, []);

    useEffect(() => {
        updateThemeColor(theme);
    }, [theme, updateThemeColor]);

    useEffect(() => {
        console.log(location.search);
        // Assuming there's a way to change the theme based on URL changes
        // This effect might not be needed if theme is updated correctly elsewhere
    }, [location.search]);

    return (
        <section className="banner banner--style1">
            <div className="container">
                <div className="banner__wrapper" style={{ position: 'relative' }}>
                    <div className="row gy-5 gx-4" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="logo-wrapper">
                            <div className="gradient-container">
                                <img src={Logo} alt="logo" width="300vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                            <div className="gradient-container">
                                <img src={LogoSeriousBroker} alt="serious broker logo" width="600vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                            <div className="gradient-container">
                                <img src={LogoSubtext3} alt="subtext logo" width="600vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
