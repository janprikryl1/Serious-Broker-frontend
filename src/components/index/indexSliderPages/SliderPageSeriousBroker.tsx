import { FC } from "react";
import { SharedSlideLayout } from "./SharedSlideLayout";
import Logo from "../../../utils/icons/logo/SB2.svg";
import BrokerBg from "/public/crypto-hand2_light.webp";
import {useTranslation} from "react-i18next";

export const SliderPageSeriousBroker: FC = () => {
    const { t } = useTranslation();
    
    return (
        <SharedSlideLayout imageUrl={BrokerBg}>
            <div className="container text-end">
                <img
                    src={Logo}
                    alt="Serious Broker logo"
                    className="logo-dark"
                    loading="lazy"
                />
                <p className="slide-tagline">
                    {t("Together We Help Your Investments Grow")}
                </p>
            </div>
        </SharedSlideLayout>
    );
};