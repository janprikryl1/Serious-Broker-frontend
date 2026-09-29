import { Dispatch, FC, SetStateAction } from "react";
import { AssetType } from "../../../utils/types/asset/AssetType";
import { toCzechDate } from "../../../utils/functions/dateFunctions.ts";
import { addToWatchList, removeFromWatchList } from "../../../utils/api/watchListService.ts";
import { WatchListEnum } from "../../../utils/enums/WatchListEnum.ts";
import { Link } from "react-router-dom";
import { routes, coinURL } from "../../../utils/constants";
import { toPercentTwoDecimal, truncateText } from "../../../utils/functions/functions.ts";
import { CryptoCurrencyAdminType } from "../../../utils/types/asset/CryptoCurrencyType.ts";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { WatchlistButton } from "../../reusable/WatchlistButton.tsx";

type Props = {
    asset: AssetType;
    setAssets: Dispatch<SetStateAction<AssetType[]>>;
    index: number;
    isLast: boolean;
    allCurrencies?: CryptoCurrencyAdminType[];
    tradingCoins?: string[];
    isAssetTrading?: (asset: AssetType) => boolean;
};

const formatCoins = (coins: string, maxItems: number = 3): string => {
    const coinArray = coins.split(',').map(c => c.trim().toUpperCase());

    const coinArrayJoined = coinArray.slice(0, maxItems).join(', ');
    if (coinArray.length <= maxItems) {
        return coinArrayJoined;
    }
    return coinArrayJoined + ", ...";
};

const getChangeColorClass = (change: number): string => {
    return change >= 0 ? 'green-color-text' : 'red-color-text';
};

export const IndexRow: FC<Props> = ({ asset, setAssets, index, isLast, allCurrencies, tradingCoins, isAssetTrading }) => {
    const { t } = useTranslation();

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

    const changeValue = asset.profit_change - 1;

    return (
        <Link to={`${routes.assetGraphURL}${encodeURIComponent(asset.name)}`}>
            <div className={`table-row d-flex align-items-stretch tw-text-xs sm:tw-text-sm md:tw-text-base ${isLast ? 'last-row' : ''}`}>
                <div
                    className="table-cell table-cell-name__index fw-bold d-flex align-items-center tw-py-2 sm:tw-py-3"
                    title={asset.name}
                >
                    <span className="tw-whitespace-normal tw-break-words tw-w-full">
                        {asset.name}
                    </span>
                </div>
                <div
                    className="table-cell table-cell-coins__index pe-3 d-flex align-items-center"
                    title={asset.coins}
                >
                    {allCurrencies && allCurrencies.length > 0 ? (
                        <>
                            <div className="simple-asset-table-crypto-logos-container">
                                {(() => {
                                    const coinArray = asset.coins.split(',').map(s => s.trim()).filter(Boolean);
                                    const visibleCoins = coinArray.slice(0, 3);
                                    const remainingCount = coinArray.length - 3;

                                    return (
                                        <>
                                            {visibleCoins.map((symbol) => {
                                                const upperSymbol = symbol.toUpperCase();
                                                const foundCoin = allCurrencies.find(coin => coin.symbol.toUpperCase() === upperSymbol);
                                                return (
                                                    <div key={symbol} className="crypto-logo">
                                                        {foundCoin && foundCoin.photo ? (
                                                            <img src={`${coinURL}/${foundCoin.photo}`} alt={upperSymbol} />
                                                        ) : (
                                                            <div style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: 'var(--secondary-color)',
                                                                borderRadius: '50%'
                                                            }} />
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {remainingCount > 0 && (
                                                <div className="crypto-logo crypto-logo-more">
                                                    +{remainingCount}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                            <div>{formatCoins(asset.coins, 3)}</div>
                        </>
                    ) : (
                        formatCoins(asset.coins, 3)
                    )}
                </div>
                <div className={`table-cell table-cell-change__index d-flex align-items-center ${getChangeColorClass(changeValue)}`}>
                    {changeValue ? (() => {
                        const change = changeValue * 100;
                        const sign = change > 0 ? "+" : "";
                        return `${sign}${change.toFixed(2)}%`;
                    })() : "-"}
                </div>
                <div className="table-cell table-cell-to-date__index d-flex align-items-center">
                    {toCzechDate(asset.to_date)}
                </div>
                <div className="table-cell table-cell-created__index d-flex align-items-center">
                    {toCzechDate(asset.created)}
                </div>
                <div className="table-cell table-cell-status__index d-flex align-items-center justify-content-center">
                    <div
                        className={`d-flex align-items-center justify-content-center status-container ${
                            isAssetTrading ? (isAssetTrading(asset) ? 'color-container--green' : 'color-container--red') : ''
                        }`}
                        style={{
                            color: isAssetTrading ? (isAssetTrading(asset) ? 'var(--green-color)' : 'var(--red-color)') : 'inherit'
                        }}
                    >
                        {isAssetTrading ? (isAssetTrading(asset) ? t('Trading') : t('Not Trading')) : 'N/A'}
                    </div>
                </div>
                <div
                    className="table-cell table-cell-watchlist__index text-center d-flex align-items-center justify-content-center"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <WatchlistButton isInWatchList={asset.in_watchlist} onToggle={asset.in_watchlist ? handleRemoveFromWatchList : handleAddToWatchlist} />
                </div>
            </div>
        </Link>
    );
};
