import { FC } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";

type Props = {
    asset: AssetType;
    isLast: boolean;
};

const formatCoins = (coins: string, maxItems: number = 3): string => {
    const coinArray = coins.split(',').map(c => c.trim());
    if (coinArray.length <= maxItems) {
        return coins;
    }
    return coinArray.slice(0, maxItems).join(', ') + ', ...';
};

export const AssetRowMobile: FC<Props> = ({ asset, isLast }) => {
    return (
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className={`table-row d-flex align-items-stretch border-top ${isLast ? 'last-row' : ''}`}>
                <div
                    className="table-cell table-cell-name-mobile fw-bold d-flex align-items-center"
                    title={asset.name}
                >
                    <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {asset.name}
                    </span>
                </div>
                <div
                    className="table-cell table-cell-coins-mobile d-flex align-items-center"
                    title={asset.coins}
                >
                    {formatCoins(asset.coins, 3)}
                </div>
            </div>
        </Link>
    );
};