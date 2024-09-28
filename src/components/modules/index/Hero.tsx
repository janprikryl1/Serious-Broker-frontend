import { FC } from "react";
import Logo from "../../../utils/icons/logo/symbol.svg";
import LogoSeriousBroker from "../../../utils/icons/logo/LogoSeriousBroker.svg";
import LogoSubtext3 from "../../../utils/icons/logo/Logo - subtext - 3.svg";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

export const Hero: FC = () => {
    const {theme} = useThemeContext();

    return (
        <section className="banner banner--style1">
            <div className="container">
                <div className="banner__wrapper" style={{ position: 'relative' }}>
                    <div className="row gy-5 gx-4" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="logo-wrapper">
                            <div className="gradient-container">
                                <img src={Logo} alt="logo" width="250vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                            <div className="gradient-container">
                                <img src={LogoSeriousBroker} alt="serious broker logo" width="550vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                            <div className="gradient-container">
                                <img src={LogoSubtext3} alt="subtext logo" width="550vw" className={theme === "dark" ? "logo-dark" : ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
