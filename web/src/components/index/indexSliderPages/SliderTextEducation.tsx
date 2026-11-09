import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.webp"
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

export const SliderTextEducation: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:767px)');

    return (
        <div data-aos="fade-up"
             data-aos-duration="1200"
             data-aos-easing="ease-out-cubic"
        >
            <h1 className={`slide-text-title${isMobile ? '--mobile mb-4' : ''}`}>
                {t("Crypto Explained Simply")}
            </h1>
            <p className={`slide-text-tagline${isMobile ? '--mobile mb-4' : ''} tw-text-xl`}>
                {t("You don't have to be an expert to get started. Our easy-to-understand articles and guides will safely walk you through the world of cryptocurrencies step by step.")}
            </p>
        </div>
    );
}