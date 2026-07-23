import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.png"
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

export const SliderTextEducation: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <>
            <h1 className={`slide-text-title${isMobile ? '--mobile mb-4' : ''}`}>
                {t("Kryptoměny srozumitelně")}
            </h1>
            <p className={`slide-text-tagline${isMobile ? '--mobile mb-4' : ''} tw-text-2xl`}>
                {t("You don't have to be an expert to get started. Our easy-to-understand articles and guides will safely walk you through the world of cryptocurrencies step by step.")}
            </p>
        </>
    );
}