import { Dispatch, FC, SetStateAction } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { toCzechDate } from "../../../utils/functions/dateFunctions.ts";
import { addToWatchList, removeFromWatchList } from "../../../utils/api/watchListService.ts";
import { WatchListEnum } from "../../../utils/enums/WatchListEnum.ts";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import {toPercentTwoDecimal, truncateText} from "../../../utils/functions/functions.ts";

type Props = {
    asset: AssetType;
    setAssets: Dispatch<SetStateAction<AssetType[]>>;
    index: number;
    isLast: boolean;
};

export const AssetRow: FC<Props> = ({ asset, setAssets, index, isLast }) => {
    const handleAddToWatchlist = async () => {
        try {
            const response = await addToWatchList(index, WatchListEnum.Asset);
            if (response?.status === 200) {
                setAssets((prevState) =>
                    prevState.map((assetItem) =>
                        assetItem.id === index ? { ...assetItem, in_watchlist: true } : assetItem
                    )
                );
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleRemoveFromWatchList = async () => {
        try {
            const response = await removeFromWatchList(index);
            if (response?.status === 200) {
                setAssets((prevState) =>
                    prevState.map((assetItem) =>
                        assetItem.id === index ? { ...assetItem, in_watchlist: false } : assetItem
                    )
                );
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className={`table-row d-flex align-items-stretch border-top ${isLast ? 'last-row' : ''}`}>
                <div
                    className="table-cell table-cell-name fw-bold d-flex align-items-center"
                    title={asset.name}
                >
                    {truncateText(asset.name, 15)}
                </div>
                <div className="table-cell table-cell-label text-truncate d-flex align-items-center" title={asset.label}>
                    {truncateText(asset.label, 10)}
                </div>
                <div className="table-cell table-cell-created d-flex align-items-center">
                    {toCzechDate(asset.created)}
                </div>
                <div
                    className="table-cell table-cell-coins pe-3 d-flex align-items-center"
                    title={asset.coins}
                >
                    {truncateText(asset.coins, 20)}
                </div>
                <div className="table-cell table-cell-change d-flex align-items-center">
                    {toPercentTwoDecimal(1 - asset.daily_change)} %
                </div>
                <div className="table-cell table-cell-to-date d-flex align-items-center">
                    {toCzechDate(asset.to_date)}
                </div>
                <div className="table-cell table-cell-watchlist text-center d-flex align-items-center justify-content-center">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        style={{ transform: "scale(0.8)", backgroundColor: "transparent", border: "3px solid #fdf7ee" }}
                        checked={asset.in_watchlist}
                        readOnly
                        onClick={asset.in_watchlist ? handleRemoveFromWatchList : handleAddToWatchlist}
                    />
                </div>
            </div>
        </Link>
    );
};