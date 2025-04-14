import { useTranslation } from "react-i18next";
import {FC, useDeferredValue, useEffect, useState, useTransition} from "react";
import { PopularCoinsSkeleton } from "./skeletons/PopularCoinsSkeleton.tsx";
import {OverviewTableChart} from "./overviewTableChart/OverviewTableChart.tsx";
import {useMediaQuery} from "@mui/material";
import {getLastCoinmarketcupCoinsSevenDays} from "../../../utils/api/indexDataService.ts";
import {MostProfitableCoinsLastSevenDays} from "../../../utils/types/indexPage/IndexDataStructure.ts";
import {coinURL} from "../../../utils/constants";
import {formatLargeCurrency} from "../../../utils/functions/functions.ts";

export const PopularCoins: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [last_coinmarketcup_coins, setLastCoinmarketcupCoins] = useState<MostProfitableCoinsLastSevenDays[]>();
    const [isPending, startTransition] = useTransition();
    const deferredData = useDeferredValue(last_coinmarketcup_coins);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getLastCoinmarketcupCoinsSevenDays();
                setLastCoinmarketcupCoins(response.data);
            } catch (exception) {
                console.error(exception);
            }
        };
        startTransition(() => {
            getData();
        });
    }, []);
    
    return (
        <>
            <h2 className="index-title">{t("Top Coins by Market Capitalization")}</h2>
            <p style={{marginBottom:-20}}>{t("A list of top 10 cryptocurrencies by market cap.")}</p>
            <div className="p-4 rounded">
                <table className="table-overview-light">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th colSpan={2}>{t("Name")}</th>
                        <th>{t("Market Cap")}</th>
                        <th>{t("Last 7 Days")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!isPending && deferredData ? (
                        deferredData.map((coin, index) => (
                            <tr key={coin.cmc_rank}>
                                <td>{index+1}</td>
                                <td className="coin-symbol">
                                    {coin.photo && (
                                        <img
                                            src={`${coinURL}/${coin.photo}`}
                                            alt={`Coin image: ${coin.asset_label}`}
                                            width={30}
                                            height={30}
                                            className="min-w-30-min-h-30"
                                        />
                                    )}
                                    <strong>{coin.asset_label}</strong>
                                </td>
                                {!isMobile && <td>{coin.name}</td>}
                                <td>{formatLargeCurrency(coin.price)}</td>
                                <td className="chart-cell">
                                    <OverviewTableChart
                                        name={coin.asset_label}
                                        data={coin.graph_data}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <PopularCoinsSkeleton/>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
