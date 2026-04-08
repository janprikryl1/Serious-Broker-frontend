import {WatchListType} from "../types/watchList/WatchListType.ts";
import {Link} from "react-router-dom";
import {WatchListEnum} from "../enums/WatchListEnum.ts";
import {routes, coinURL} from "../constants";
import {LuTrash} from "react-icons/lu";
import {removeFromWatchList} from "../api/watchListService.ts";
import {Dispatch, ReactNode, SetStateAction} from "react";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import {CryptoCurrencyAdminType} from "../types/asset/CryptoCurrencyType.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";

export const renderTable = (
    title: ReactNode,
    items: WatchListType[], 
    watchList: WatchListType[], 
    setWatchList: Dispatch<SetStateAction<WatchListType[] | undefined>>,
    cryptocurrencies?: CryptoCurrencyAdminType[],
    recommendationData?: Map<string, BinanceIndexAssetRecomBestPreviousDetails>
) => {
    const { t } = useTranslation()

    const handleRemoveFromWatchList = async (watchListItem: WatchListType) => {
        try {
            const response = await removeFromWatchList(watchListItem.item_id);
            if (response?.status === 200 && watchList) {
                setWatchList(watchList.filter((item) => item.id !== watchListItem.id));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const getCryptoLogo = (title: string | null): string | null => {
        if (!title || !cryptocurrencies) return null;
        const crypto = cryptocurrencies.find(c => c.symbol && c.symbol.toUpperCase() === title.toUpperCase());
        return crypto?.photo ? `${coinURL}/${crypto.photo}` : null;
    }

    const getWeek0Profit = (title: string | null): number | null => {
        if (!title || !recommendationData) return null;
        const coinData = recommendationData.get(title);
        return coinData?.week_0_profit ?? null;
    }

    const getMonth0Profit = (title: string | null): number | null => {
        if (!title || !recommendationData) return null;
        const coinData = recommendationData.get(title);
        return coinData?.month_0_profit ?? null;
    }

    const getQuarter0Profit = (title: string | null): number | null => {
        if (!title || !recommendationData) return null;
        const coinData = recommendationData.get(title);
        return coinData?.quarter_0_profit ?? null;
    }

    const getYear0Profit = (title: string | null): number | null => {
        if (!title || !recommendationData) return null;
        const coinData = recommendationData.get(title);
        return coinData?.year_0_profit ?? null;
    }

    const formatProfit = (profit: number | null): string | null => {
        if (!profit) return null;
        const profitChange = profit - 1;
        return (profitChange * 100 > 0 ? "+" : "") + (profitChange * 100).toFixed(2) + "%";
    }

    const getProfitColorClass = (profit: number | null): string => {
        if (!profit) return "";
        const profitChange = profit - 1;
        return profitChange * 100 >= 0 ? "green-on-primary-color-text" : "red-on-primary-color-text";
    }
    
    if (items.length === 0) return null;

    const isCoinsTable = items.length > 0 && items.every(item => item.type === WatchListEnum.Coin);

    if (isCoinsTable) {
        // Definícia stĺpcov pre tabuľku
        type TableColumn = {
            label: string;
            key: string;
            minWidth: string;
            flex: number;
            getValue: (item: WatchListType) => number | null;
        };

        const columns: TableColumn[] = [
            {
                label: "Week",
                key: "week",
                minWidth: "80px",
                flex: 1,
                getValue: (item) => getWeek0Profit(item.title)
            },
            {
                label: "Month",
                key: "month",
                minWidth: "80px",
                flex: 1,
                getValue: (item) => getMonth0Profit(item.title)
            },
            {
                label: "Quarter",
                key: "quarter",
                minWidth: "80px",
                flex: 1,
                getValue: (item) => getQuarter0Profit(item.title)
            },
            {
                label: "Year",
                key: "year",
                minWidth: "80px",
                flex: 1,
                getValue: (item) => getYear0Profit(item.title)
            }
        ];

        // Coins
        return (
            <OutlineContainer style={{margin: 0}} bgColor={"var(--quaternary-color-transparent-50)"}>
                <h3 className="mb-4">{title}</h3>
                <div className="overflow-x-auto">
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th rowSpan={2} className="text-start fw-bold" style={{padding: '12px', flex: 1, minWidth: '120px'}}>{t("Name")}</th>
                                <th colSpan={columns.length} className="text-center gray-2-color-text" style={{padding: '0px', lineHeight: "1.3", fontWeight: 400}}>
                                    {t("Change")}
                                </th>
                                <th rowSpan={2} className="text-center" style={{padding: '12px', flex: 0.3, minWidth: '40px'}}></th>
                            </tr>
                            <tr style={{borderBottom: '1px solid var(--gray-1-color)'}}>
                                {columns.map((col) => (
                                    <th key={col.key} className="text-center fw-bold" style={{padding: '12px', flex: col.flex, minWidth: col.minWidth}}>
                                        {t(col.label)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-start" style={{padding: '15px', flex: 1, minWidth: '120px'}}>
                                        <Link 
                                            to={`${routes.assetGraphDetail}/${item.item_id}`}
                                            className="d-flex align-items-center gap-3 text-decoration-none"
                                            style={{color: 'inherit'}}
                                        >
                                            {(() => {
                                                const logoUrl = getCryptoLogo(item.title);
                                                return logoUrl ? (
                                                    <img 
                                                        src={logoUrl} 
                                                        alt={item.title || "crypto"}
                                                        style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0}}
                                                    />
                                                ) : (
                                                    <div 
                                                        style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)', flexShrink: 0}}
                                                    />
                                                );
                                            })()}
                                            <span>{item.title}</span>
                                        </Link>
                                    </td>
                                    {columns.map((col) => {
                                        const profit = col.getValue(item);
                                        return (
                                            <td key={col.key} className="text-center" style={{padding: '12px', flex: col.flex, minWidth: col.minWidth}}>
                                                {profit ? (
                                                    <span className={getProfitColorClass(profit)}>
                                                        {formatProfit(profit)}
                                                    </span>
                                                ) : '-'}
                                            </td>
                                        );
                                    })}
                                    <td className="text-center" style={{padding: '12px', flex: 0.3, minWidth: '40px'}}>
                                        <LuTrash 
                                            size={18} 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleRemoveFromWatchList(item);
                                            }}
                                            style={{cursor: 'pointer', color: 'var(--secondary-color)'}}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </OutlineContainer>
        );
    } else {
        // Articles and assets
        return (
            <OutlineContainer style={{margin: 0}} bgColor={"var(--quaternary-color-transparent-50)"}>
                <h3 className="mb-4">{title}</h3>
                <div className="watchlist-items">
                    {items.map((item) => (
                        <div key={item.id} className="watchlist-item d-flex justify-content-between align-items-center mb-5">
                            <Link 
                                to={item.type === WatchListEnum.Asset ? `${routes.assetGraphURL}${item.title}` : `${routes.articleURL}${item.item_id}`}
                                className="text-decoration-none"
                                style={{flex: 1, color: 'inherit'}}
                            >
                                <div className="d-flex justify-content-between align-items-center" style={{flex: 1}}>
                                    <div>
                                        <p className="mb-1">{item.title}</p>
                                        <small className="gray-2-color-text">
                                            {item.created && new Date(item.created).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            </Link>
                            <LuTrash 
                                className="ms-3"
                                size={18} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemoveFromWatchList(item);
                                }}
                                style={{cursor: 'pointer', color: 'var(--secondary-color)'}}
                            />
                        </div>
                    ))}
                </div>
            </OutlineContainer>
        );
    }
};