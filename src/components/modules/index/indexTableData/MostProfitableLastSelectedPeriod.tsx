import {FC, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { IndexTableChart } from "./indexTableChart/IndexTableChart.tsx";
import {AssetProfitData} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import { calculateProfit } from "../../../../utils/constants/functions.ts";
import { GainSeasonTh } from "./GainSeasonTh.tsx";
import { IndexSeason } from "../../../../utils/enums/IndexSeasonEnum.ts";
import { getMostProfitableSelectedPeriod} from "../../../../api/indexDataService.ts";
import {IndexTableSkeleton} from "./IndexTableSkeleton.tsx";
import {coinURL} from "../../../../utils/constants";


export const MostProfitableLastSelectedPeriod: FC = () => {
    const { t } = useTranslation();
    const { season, chartType } = useIndexDataContext();
    const [data, setData] = useState<AssetProfitData[]>();

    useEffect(() => {
        const fetchData = async () => {
            setData(undefined);
            try {
                const result = await getMostProfitableSelectedPeriod(season, chartType);
                setData(result.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [season, chartType]);

    const getProfitData = useMemo(() => {
        const profitMap = (coin: AssetProfitData) => ({
            Week: [
                calculateProfit(coin.week_0_profit!),
                calculateProfit(coin.week_1_profit!),
                calculateProfit(coin.week_2_profit!),
            ].filter(value => value !== null),
            Month: [
                calculateProfit(coin.month_0_profit!),
                calculateProfit(coin.month_1_profit!),
                calculateProfit(coin.month_2_profit!),
            ].filter(value => value !== null),
            Quarter: [
                calculateProfit(coin.quarter_0_profit!),
                calculateProfit(coin.quarter_1_profit!),
                calculateProfit(coin.quarter_2_profit!),
            ].filter(value => value !== null),
            Year: [
                calculateProfit(coin.year_0_profit!),
                calculateProfit(coin.year_1_profit!),
                calculateProfit(coin.year_2_profit!),
            ].filter(value => value !== null),
            Smart: [
                calculateProfit(coin.max_0_profit!),
                calculateProfit(coin.max_1_profit!),
                calculateProfit(coin.max_2_profit!),
            ].filter(value => value !== null),
        });

        return (coin: AssetProfitData) => profitMap(coin)[season as keyof typeof profitMap];
    }, [season]);
    
    return (
        <div className="p-4 rounded">
            {data ? (
                <table className="table-index-light mb-3">
                    <thead>
                    <tr>
                        <th>{t("Position")}</th>
                        <th>Coin</th>
                        <th>{t("Name")}</th>
                        <GainSeasonTh/>
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((coin, index) => (
                        <tr key={index}>
                            <td>
                                {season === IndexSeason.SMART
                                    ? index + 1
                                    : season === IndexSeason.WEEK
                                        ? coin.week_0_pos
                                        : season === IndexSeason.MONTH
                                            ? coin.month_0_pos
                                            : season === IndexSeason.QUARTER
                                                ? coin.quarter_0_pos
                                                : coin.year_0_pos
                                }
                            </td>
                            <td>{coin.photo && <img src={`${coinURL}/${coin.photo}`} alt={`Coin image: ${coin.asset_label}`}
                                                    width={30}/>} {coin.asset_label}</td>
                            <td>{coin.name}</td>
                            <td>
                                {season === IndexSeason.SMART
                                    ? `${(coin.max_0_profit! * 100).toFixed(2)} %`
                                    : `${(((season === IndexSeason.WEEK
                                        ? coin.week_0_profit!
                                        : season === IndexSeason.MONTH
                                            ? coin.month_0_profit!
                                            : season === IndexSeason.QUARTER
                                                ? coin.quarter_0_profit!
                                                : coin.year_0_profit!) - 1) * 100).toFixed(2)} %`
                                }
                            </td>
                            <td>
                                <IndexTableChart
                                    name={coin.asset_label}
                                    data={getProfitData(coin)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : <IndexTableSkeleton/>}
        </div>
    );
};