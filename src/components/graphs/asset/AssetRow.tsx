import { CSSProperties, Dispatch, FC, SetStateAction } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { toCzechDate } from "../../../utils/functions/dateFunctions.ts";
import { addToWatchList, removeFromWatchList } from "../../../utils/api/watchListService.ts";
import { WatchListEnum } from "../../../utils/enums/WatchListEnum.ts";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

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
                className="col-2 fw-bold d-flex align-items-center"
                style={{ ...firstColumnStyle, ...multiLineClampStyle }}
                title={asset.name}
            >
                {asset.name}
            </div>
            <div className="text-truncate d-flex align-items-center" style={{ flex: '0 0 19%', maxWidth: '19%', paddingLeft: '1rem' }} title={asset.label}>
                {asset.label.length > 15 ? asset.label.slice(0, 15)+" ..." : asset.label}
            </div>
            <div className="d-flex align-items-center" style={{ flex: '0 0 12.5%' }}>{toCzechDate(asset.created)}</div>
            <div
                className="pe-3 d-flex align-items-center"
                style={{ ...multiLineClampStyle, flex: '0 0 22%', maxWidth: '29%' }}
                title={coinsString}
            >
                {coinsString}
            </div>
            <div className="col-1 pe-3 d-flex align-items-center">{asset.daily_change.toFixed(2)} %</div>
            <div className="d-flex align-items-center" style={{ flex: '0 0 12%'}}>{toCzechDate(asset.to_date)}</div>
            <div className="col-1 text-center d-flex align-items-center justify-content-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ transform: "scale(0.8)" }}
                    checked={asset.in_watchlist}
                    readOnly
                    onClick={asset.in_watchlist ? handleRemoveFromWatchList : handleAddToWatchlist}
                />
            </div>
        </div>
        </Link>
    );
};