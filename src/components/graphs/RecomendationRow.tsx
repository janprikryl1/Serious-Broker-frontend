import { CSSProperties, FC } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import {useMediaQuery} from "@mui/material";

type Props = {
    data: BinanceIndexAssetRecomBestPreviousType;
    isLast: boolean;
};

export const RecomendationRow: FC<Props> = ({ data, isLast }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    const multiLineClampStyle: CSSProperties = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const firstColumnStyle: CSSProperties = {
        ...multiLineClampStyle,
        padding: '0.75rem',
        borderLeft: '2px solid #d2c6a8',
        borderRight: '2px solid #d2c6a8',
        ...(isLast && {
            borderBottom: '2px solid #d2c6a8',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
        })
    };

    return (
        <Link to={`${routes.graphsRecommendationDetailURL}${data.asset_label}`}>
        <div className="table-row d-flex align-items-stretch border-top">
            <div
                className="col-2 fw-bold d-flex align-items-center"
                style={firstColumnStyle}
                title={data.name}
            >
                {data.name}
            </div>
            <div
                className="text-truncate d-flex align-items-center"
                style={{ flex: '0 0 19%', maxWidth: '15%', paddingLeft: '1rem' }}
                title={data.asset_label}
            >
                {data.asset_label.length > 15 ? data.asset_label.slice(0, 15) + " ..." : data.asset_label}
            </div>
            <div
                className="pe-3 d-flex align-items-center"
                style={{ flex: '0 0 22%', maxWidth: '29%' }}
                title={data.quote_currencies}
            >
                {data.quote_currencies.length > (isMobile ? 5 : 15) ? data.quote_currencies.slice(0, (isMobile ? 5 : 15))+"...":data.quote_currencies}
            </div>
            <div className="pe-3 d-flex align-items-center" style={{ flex: '0 0 12.5%' }}>
                {data.cmc_rank ?? "-"}
            </div>
            <div className="col-1 pe-3 d-flex align-items-center" style={{ flex: '0 0 12%' }}>
                {data.week_0_pos ?? "-"}
            </div>
            <div className="d-flex align-items-center"  style={{ flex: '0 0 12%' }}>
                {data.week_0_profit ? (data.week_0_profit.toFixed(2) + "%") : "-"}
            </div>
            <div className="d-flex align-items-center" style={{ flex: '0 0 11%' }}>
                {data.week_sug ?? "-"}
            </div>
        </div>
        </Link>
    );
};
