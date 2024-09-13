import { FC } from "react";
import Logo from "../../../utils/icons/logo/symbol.svg";
import LogoSeriousBroker from "../../../utils/icons/logo/LogoSeriousBroker.svg";
import LogoSubtext3 from "../../../utils/icons/logo/Logo - subtext - 3.svg";

export const Hero: FC = () => {
    return (
        <section className="banner banner--style1">
            <div className="container">
                <div className="banner__wrapper">
                    <div className="row gy-5 gx-4">
                        <div className="logo-wrapper">
                            <img
                                src={Logo}
                                alt="logo"
                                width={"300vw"}
                            />
                            <img
                                src={LogoSeriousBroker}
                                alt="serious broker logo"
                                width={"600vw"}
                            />
                            <img
                                src={LogoSubtext3}
                                alt="subtext logo"
                                width={"600vw"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/*
import bannerHome3 from "../../../utils/icons/banner/home1/3.png";
import bannerHome4 from "../../../utils/icons/banner/home1/4.png";

<div className="banner__content-coin">
              <img src={bannerHome3} alt="coin icon"/>
          </div>
          <div className="banner__shape">
          <span className="banner__shape-item banner__shape-item--1">
            <img src={bannerHome4} alt="shape icon"/>
          </span>
          </div>
 */