import { CSSProperties, FC } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

type Props = {
    asset: AssetType;
    isLast: boolean;
};

export const AssetRowMobile: FC<Props> = ({ asset, isLast }) => {
    const coinsString = asset.coins.map(c => `${c.coin}\u00A0${c.amount}%`).join(', ').slice(0, 18)+" ...";

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
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className="table-row d-flex align-items-stretch border-top">
                <div
                    className="col-4 fw-bold d-flex align-items-center"
                    style={{ ...firstColumnStyle, ...multiLineClampStyle }}
                    title={asset.name}
                >
                    {asset.name}
                </div>
                <div className="col-3 text-truncate d-flex align-items-center" style={{ paddingLeft: '1rem' }} title={asset.label}>
                    {asset.label.length > 15 ? asset.label.slice(0, 15)+" ..." : asset.label}
                </div>
                <div
                    className="col-5 d-flex align-items-center"
                    style={{ ...multiLineClampStyle, paddingLeft: '1rem' }}
                    title={coinsString}
                >
                    {coinsString}
                </div>
            </div>
        </Link>
    );
};