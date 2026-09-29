import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.png"
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

export const SliderTextAutopilot: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div data-aos="fade-up"
             data-aos-duration="1200"
             data-aos-easing="ease-out-cubic"
        >
            <h1 className={`slide-text-title${isMobile ? '--mobile mb-4' : ''}`}>
                {t("Investment Autopilot")}
            </h1>
            <p className={`slide-text-tagline${isMobile ? '--mobile mb-4' : ''} tw-text-2xl`}>
                {t("Create a tailored investment plan and let technology watch the market for you. Emotion-free and stress-free.")}
            </p>
        </div>
    );
}