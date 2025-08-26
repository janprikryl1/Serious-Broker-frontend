import { FC } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import {truncateText} from "../../../utils/functions/functions.ts";

type Props = {
    asset: AssetType;
    isLast: boolean;
};

export const AssetRowMobile: FC<Props> = ({ asset, isLast }) => {
    return (
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className={`table-row d-flex align-items-stretch border-top ${isLast ? 'last-row' : ''}`}>
                <div
                    className="table-cell table-cell-name-mobile fw-bold d-flex align-items-center"
                    title={asset.name}
                >
                    {truncateText(asset.name, 12)}
                </div>
                <div className="table-cell table-cell-label-mobile text-truncate d-flex align-items-center" title={asset.label}>
                    {truncateText(asset.label, 10)}
                </div>
                <div
                    className="table-cell table-cell-coins-mobile d-flex align-items-center"
                    title={asset.coins}
                >
                    {truncateText(asset.coins, 10)}
                </div>
            </div>
        </Link>
    );
};