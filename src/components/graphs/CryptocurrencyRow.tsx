import {FC, useEffect, useState} from "react";
import {
    BinanceIndexAssetRecomBestPreviousType
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {Link} from "react-router-dom";
import {coinURL, routes} from "../../utils/constants";
import {CryptoCurrencyAdminType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";
import {WatchListType} from "../../utils/types/watchList/WatchListType.ts";
import {AssetCoinID} from "../../pages/graphs/CryptocurrenciesList.tsx";
import {useTranslation} from "react-i18next";
import {WatchlistButton} from "../reusable/WatchlistButton.tsx";
import baseGoldIcon from "../../utils/icons/coins/base_gold.png";

type Props = {
    data: BinanceIndexAssetRecomBestPreviousType;
    isLast: boolean;
    allCurrencies?: CryptoCurrencyAdminType[];
    watchlist: WatchListType[];
    allCoinsIDs: AssetCoinID[];
    activeCoins: string[];
};

const formatCoins = (coins: string, maxItems: number = 3): string => {
    const coinArray = coins.split(',').map(c => c.trim().toUpperCase());

    const coinArrayJoined = coinArray.slice(0, maxItems).join(', ');
    if (coinArray.length <= maxItems) {
        return coinArrayJoined;
    }
    return coinArrayJoined + ", ...";
};

export const CryptocurrencyRow: FC<Props> = ({ data, isLast, allCurrencies = [], watchlist, allCoinsIDs, activeCoins }) => {
    const { t } = useTranslation();
    const assetSymbol = data.asset_label.trim().toUpperCase();
    const foundAssetCoin = allCurrencies.find(coin => coin.symbol.toUpperCase() === assetSymbol);
    const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
    const isAssetTrading = activeCoins.includes(data.asset_label.toUpperCase());
    const profitChange = data.week_0_profit - 1;

    useEffect(() => {
        checkIfInWatchlist();
    }, [watchlist, data.asset_label]);

    const checkIfInWatchlist = () => {
        if (!watchlist || watchlist.length === 0) {
            setIsInWatchlist(false);
            return;
        }

        const isFound = watchlist.some(item =>
            item.title === data.asset_label &&
            item.type === WatchListEnum.Coin
        );
        setIsInWatchlist(isFound);
    };

    const handleAddToWatchList = async () => {
        const foundCoin = allCoinsIDs.find(
            (coin) => coin.asset_label.toUpperCase() === data.asset_label.toUpperCase()
        );

        if (!foundCoin) {
            console.error(`Nenašlo sa ID pre asset: ${data.asset_label}`);
            return;
        }

        try {
            const response = await addToWatchList(
                foundCoin.id,
                WatchListEnum.Coin
            );

            if (response?.status === 200) {
                setIsInWatchlist(true);
            }
        } catch (error) {
            console.error("Error adding to watchlist:", error);
        }
    };

    const handleRemoveFromWatchList = async () => {
        const foundCoin = allCoinsIDs.find(
            (coin) => coin.asset_label.toUpperCase() === data.asset_label.toUpperCase()
        );

        if (!foundCoin) {
            console.error(`Nenašlo sa ID pre odstránenie: ${data.asset_label}`);
            return;
        }

        try {
            const response = await removeFromWatchList(foundCoin.id);

            if (response?.status === 200) {
                setIsInWatchlist(false);
            }
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    const getChangeColorClass = (change: number): string => {
        return change >= 0 ? 'green-color-text' : 'red-color-text';
    };

    return (
        <Link
            to={`${routes.graphsRecommendationDetailURL}${data.asset_label}`}
            state={{ isInWatchlist, assetId: foundAssetCoin?.id }}
        >
            <div className={`table-row d-flex align-items-stretch tw-text-xs sm:tw-text-sm md:tw-text-base ${isLast ? 'last-row' : ''}`}>
                {/* CoinMarketCap position */}
                <div className="table-cell table-cell-cmc__recom d-flex align-items-center">
                    {data.cmc_rank ?? "-"}
                </div>

                {/* Name */}
                <div
                    className="table-cell table-cell-name__recom fw-bold d-flex align-items-center tw-py-2 sm:tw-py-3"
                    title={data.name}
                >
                    <div className="tw-flex-shrink-0 tw-mr-2 sm:tw-mr-3 tw-w-7 tw-h-7 sm:tw-w-10 sm:tw-h-10 tw-flex tw-items-center tw-justify-center">
                        {foundAssetCoin && foundAssetCoin.stylized_image ? (
                            <img
                                src={`${coinURL}/${foundAssetCoin.stylized_image}`}
                                alt={assetSymbol}
                                className="tw-w-full tw-h-full tw-object-contain"
                            />
                        ) : (
                            <img
                                src={baseGoldIcon}
                                alt={assetSymbol}
                                className="tw-w-full tw-h-full tw-object-contain"
                            />
                        )}
                    </div>
                    <span className="tw-break-words tw-whitespace-normal" style={{ minWidth: 0, lineHeight: 1.3 }}>
                        {data.name}
                    </span>
                </div>

                {/* Quote currencies */}
                <div
                    className="table-cell table-cell-traded-for__recom pe-3 d-flex align-items-center"
                    title={data.quote_currencies}
                >
                    {formatCoins(data.quote_currencies, 3)}
                </div>

                {/* Profit week */}
                <div className={`table-cell table-cell-profit__recom d-flex align-items-center ${getChangeColorClass(profitChange)}`}>
                    {profitChange ?
                        (profitChange * 100 > 0 ? "+" : "") +
                        (profitChange * 100).toFixed(2) + "%"
                        : "-"}
                </div>

                {/* Status */}
                <div className="table-cell table-cell-status__recom d-flex align-items-center justify-content-center">
                    <div
                        className={`d-flex align-items-center justify-content-center status-container ${
                            isAssetTrading ? 'color-container--green' : 'color-container--red'
                        }`}
                        style={{
                            color: isAssetTrading ? 'var(--green-color)' : 'var(--red-color)'
                        }}
                    >
                        {isAssetTrading ? t('Trading') : t('Not Trading')}
                    </div>
                </div>

                {/* Bookmark icon */}
                <div
                    className="table-cell table-cell-watchlist__recom text-center d-flex align-items-center justify-content-center"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <WatchlistButton isInWatchList={isInWatchlist} onToggle={isInWatchlist ? handleRemoveFromWatchList : handleAddToWatchList} />
                </div>
            </div>
        </Link>
    );
};
