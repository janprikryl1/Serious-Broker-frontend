import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TrendingSwiper} from "./TrendingSwiper.tsx";

export const NowTrending:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="cta-dark">
            <div className="container">
                <h1>{t("Now Trending")}</h1>
                <TrendingSwiper />
            </div>
        </div>
    );
}