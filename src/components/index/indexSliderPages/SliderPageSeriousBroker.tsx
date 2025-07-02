import { FC } from "react";
import { SharedSlideLayout } from "./SharedSlideLayout";
import Logo from "../../../utils/icons/logo/SB2.svg";
import BrokerBg from "../../../utils/icons/index/crypto-hand2_light.webp";
import { useTranslation } from "react-i18next";

export const SliderPageSeriousBroker: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="serious-broker-correct-layout">
            <SharedSlideLayout imageUrl={BrokerBg} backgroundSize={"65% 120%"} backgroundPosition={"0% 12vh"}>
                <div>
                    <img
                        src={Logo}
                        alt="Serious Broker logo"
                        className="logo-dark"
                        loading="lazy"
                    />
                    <h3 className="slide-title" style={{fontSize: 50, lineHeight: 0.2}}>{t("Your Money,")}</h3>
                    <h3 className="slide-title" style={{fontSize: 50, marginBottom:"13vh"}}>{t("Your Rules")}</h3>
                </div>
            </SharedSlideLayout>
        </div>
    );
};