import { FC } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { Link } from "react-router-dom";
import { routes } from "../../utils/constants";
import { useMediaQuery } from "@mui/material";
import {truncateText} from "../../utils/functions/functions.ts";

type Props = {
    data: BinanceIndexAssetRecomBestPreviousType;
    isLast: boolean;
};

export const RecomendationRow: FC<Props> = ({ data, isLast }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Link to={`${routes.graphsRecommendationDetailURL}${data.asset_label}`}>
            <div className={`table-row d-flex align-items-stretch border-top ${isLast ? 'last-row' : ''}`}>
                <div
                    className="reco-table-cell col-title fw-bold d-flex align-items-center"
                    title={data.name}
                >
                    {truncateText(data.name, 12)}
                </div>
                <div
                    className="reco-table-cell col-label text-truncate d-flex align-items-center"
                    title={data.asset_label}
                >
                    {data.asset_label}
                </div>
                <div
                    className="reco-table-cell col-coins pe-3 d-flex align-items-center"
                    title={data.quote_currencies}
                >
                    {truncateText(data.quote_currencies, 21)}
                </div>
                {!isMobile && <>
                    <div className="reco-table-cell col-cmc-rank pe-3 d-flex align-items-center">
                        {data.cmc_rank ?? "-"}
                    </div>
                    <div className="reco-table-cell col-week-rank d-flex align-items-center">
                        {data.week_0_pos ?? "-"}
                    </div>
                    <div className="reco-table-cell col-week-profit d-flex align-items-center">
                        {data.week_0_profit ? (data.week_0_profit.toFixed(2) + "%") : "-"}
                    </div>
                    <div className="reco-table-cell col-week-recom d-flex align-items-center">
                        {data.week_sug ?? "-"}
                    </div>
                </>}
            </div>
        </Link>
    );
};