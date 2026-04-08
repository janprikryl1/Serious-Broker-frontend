import { FC } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { toCzechDate } from "../../../utils/functions/dateFunctions.ts";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import { truncateText} from "../../../utils/functions/functions.ts";

type Props = {
    asset: AssetType;
    index: number;
    isLast: boolean;
};

export const AssetRowSimple: FC<Props> = ({ asset, index, isLast }) => {
    return (
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className={`table-row d-flex align-items-stretch border-top ${isLast ? 'last-row' : ''}`}>
                <div
                    className="table-cell table-cell-name fw-bold d-flex align-items-center"
                    title={asset.name}
                >
                    {truncateText(asset.name, 15)}
                </div>
                <div
                    className="table-cell table-cell-coins pe-3 d-flex align-items-center"
                    title={asset.coins}
                >
                    {truncateText(asset.coins, 20)}
                </div>
                <div className="table-cell table-header-cell-coins-number d-flex align-items-center">
                    {asset.coins.length}
                </div>
                <div className="table-cell table-cell-created d-flex align-items-center">
                    {toCzechDate(asset.created)}
                </div>
            </div>
        </Link>
    );
};