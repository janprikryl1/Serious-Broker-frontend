import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.webp"
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

export const SliderTextTools: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div data-aos="fade-up"
             data-aos-duration="1200"
             data-aos-easing="ease-out-cubic"
        >
            <h1 className={`slide-text-title${isMobile ? '--mobile mb-4' : ''}`}>
                {t("Tools for the right decisions")}
            </h1>
            <p className={`slide-text-tagline${isMobile ? '--mobile mb-4' : ''} tw-text-2xl`}>
                {t("Stop guessing where the market will go. Our analytical tools will show you the exact historical development and simulations of popular strategies.")}
            </p>
        </div>
    );
}