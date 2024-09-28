import {FC} from "react";
import {BinanceIndexAssetRecomBestPreviousType} from "../../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

type Props = {
    data: BinanceIndexAssetRecomBestPreviousType;
}

export const RecomDetail:FC<Props> = ({data}) => {
    const {t} = useTranslation();
    
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={`/graphs/recommendation/detail/${data.asset_label}`}
                              className="none">{data.asset_label}</Link>
                    </h5>
                    <p>{t("Quote currencies: ")}{data.quote_currencies}</p>
                    <p>{t("cmc_rank")}: {data.cmc_rank}</p>
                    <p>{t("Best of all index: ")}{data.all_pos}</p>
                    <p>{t("All suggestions: ")}{data.all_sug}</p>
                    <p>{t("Week suggestions: ")}{data.week_sug}</p>
                    <p>{t("Week all: ")}{data.week_all}</p>
                    <p>{t("Week all profit: ")}{data.week_all_profit}</p>
                    <p>{t("Positions in week 0: ")}{data.week_0_pos}</p>
                </div>
            </div>
        </div>
    );
};