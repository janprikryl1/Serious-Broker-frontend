import { useTranslation } from "react-i18next";
import {FC, useEffect, useState} from "react";
import { formatLargeCurrency } from "../../../../utils/constants/functions.ts";
import { PopularCoinsSkeleton } from "./skeletons/PopularCoinsSkeleton.tsx";
import { coinURL } from "../../../../utils/constants";
import {IndexTableChart} from "./indexTableChart/IndexTableChart.tsx";
import {useMediaQuery} from "@mui/material";
import {MostProfitableCoinsLastSevenDays} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {getLastCoinmarketcupCoinsSevenDays} from "../../../../api/indexDataService.ts";

export const PopularCoins: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [last_coinmarketcup_coins, setLastCoinmarketcupCoins] = useState<MostProfitableCoinsLastSevenDays[]>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getLastCoinmarketcupCoinsSevenDays();
                setLastCoinmarketcupCoins(response.data);
            } catch (exception) {
                console.error(exception);
            }
        };
        getData();
    }, []);
    
    return (
        <>
            <h2 style={{fontSize: "35px"}}>{t("Top Coins by Market Capitalization")}</h2>
            <p>{t("A list of top 10 cryptocurrencies by market cap.")}</p>
            <div className="p-4 rounded">
                <table className="table-index-light">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{t("Symbol")}</th>
                        {!isMobile && <th>{t("Name")}</th>}
                        <th>{t("Market Cap")}</th>
                        <th>{t("Last 7 Days")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {last_coinmarketcup_coins ? (
                        last_coinmarketcup_coins.map((coin) => (
                            <tr key={coin.cmc_rank}>
                                <td>{coin.cmc_rank}</td>
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
                                <td>
                                    <IndexTableChart
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
