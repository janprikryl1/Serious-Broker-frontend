import { FC, useState, useEffect } from "react";
import { BinanceIndexAssetRecomBestPreviousType } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import { Link } from "react-router-dom";
import { routes, coinURL } from "../../utils/constants";
import { CryptoCurrencyAdminType } from "../../utils/types/asset/CryptoCurrencyType.ts";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";
import {BsBookmark, BsBookmarkFill} from "react-icons/bs";
import { WatchListType } from "../../utils/types/watchList/WatchListType.ts";
import {AssetCoinID} from "../../pages/graphs/Recommendation.tsx";

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

export const RecomendationRow: FC<Props> = ({ data, isLast, allCurrencies = [], watchlist, allCoinsIDs, activeCoins }) => {
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

    const handleAddToWatchList = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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

    const handleRemoveFromWatchList = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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
        return change >= 0 ? 'green-on-primary-color-text' : 'red-on-primary-color-text';
    };

    return (
        <Link to={`${routes.graphsRecommendationDetailURL}${data.asset_label}`}>
            <div className={`table-row d-flex align-items-stretch ${isLast ? 'last-row' : ''}`}>
                {/* Name */}
                <div
                    className="table-cell table-cell-name-short fw-bold d-flex align-items-center"
                    title={data.name}
                >
                    <div className="simple-asset-table-crypto-logos-container" style={{ marginRight: '10px', width: '35px' }}>
                        <div className="crypto-logo" style={{ margin: 0, width: '35px', height: '35px' }}>
                            {foundAssetCoin && foundAssetCoin.photo ? (
                              <img src={`${coinURL}/${foundAssetCoin.photo}`} alt={assetSymbol}/>
                            ) : (
                              <div style={{
                                  width: '100%',
                                  height: '100%',
                                  backgroundColor: 'var(--secondary-color)',
                                  borderRadius: '50%'
                              }} />
                            )}
                        </div>
                    </div>
                    <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {data.name}
                    </span>
                </div>

                {/* Quote currencies */}
                <div
                    className="table-cell table-cell-traded-for pe-3 d-flex align-items-center"
                    title={data.quote_currencies}
                >
                    {formatCoins(data.quote_currencies, 3)}
                </div>

                {/* CoinMarketCap position */}
                <div className="table-cell table-cell-change d-flex align-items-center">
                    {data.cmc_rank ?? "-"}
                </div>

                {/* Weekly ranking */}
                <div className="table-cell table-cell-to-date d-flex align-items-center">
                    {data.week_0_pos ?? "-"}
                </div>

                {/* Profit week */}
                <div className={`table-cell table-cell-created d-flex align-items-center ${getChangeColorClass(profitChange)}`}>
                    {profitChange ?
                      (profitChange * 100 > 0 ? "+" : "") +
                      (profitChange * 100).toFixed(2) + "%"
                      : "-"}
                </div>

                {/* Week recom */}
                <div className="table-cell table-cell-created text-center d-flex align-items-center justify-content-center">
                    {data.week_sug ?? "-"}
                </div>

                {/* Status */}
                <div className="table-cell table-cell-status d-flex align-items-center justify-content-center">
                    <div className={`d-flex align-items-center justify-content-center status-container ${
                      isAssetTrading ? 'color-container--green' : 'color-container--red'
                    }`} style={{
                        color: isAssetTrading ? 'var(--green-on-primary-color)' : 'var(--red-on-primary-color)',
                        fontSize: '0.85rem'
                    }}>
                        {isAssetTrading ? 'Active' : 'Inactive'}
                    </div>
                </div>

                {/* Bookmark icon */}
                <div
                  className="table-cell table-cell-watchlist text-center d-flex align-items-center justify-content-center"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                  }}
                >
                    <div onClick={isInWatchlist ? handleRemoveFromWatchList : handleAddToWatchList} style={{ display: 'flex', alignItems: 'center' }}>
                        {isInWatchlist ? (
                          <BsBookmarkFill size={20} color="var(--secondary-color)" />
                        ) : (
                          <BsBookmark size={20} color="var(--secondary-color)" />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};