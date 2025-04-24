import {FC} from "react";
import { useTranslation } from "react-i18next";
import { OverviewTableChart } from "./overviewTableChart/OverviewTableChart.tsx";
import { GainSeasonTh } from "./GainSeasonTh.tsx";
import {coinURL} from "../../../utils/constants";
import {IndexSeasonExtended} from "../../../utils/enums/IndexSeasonEnum.ts";
import {IndexTableSkeleton} from "./skeletons/IndexTableSkeleton.tsx";
import {useMostProfitableLastSelectedPeriod} from "../../../utils/hooks/useMostProfitableLastSelectedPeriod.ts";


export const MostProfitableLastSelectedPeriod: FC = () => {
    const { t } = useTranslation();
    const {data, isPending, getProfitData, season} = useMostProfitableLastSelectedPeriod();

    return (
        <div className="p-4 rounded">
            {!isPending && data ? (
                <table className="table-overview-light mb-3">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th colSpan={2}>{t("Name")}</th>
                        <GainSeasonTh/>
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((coin, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className="coin-symbol">{coin.photo && <img src={`${coinURL}/${coin.photo}`} alt={`Coin image: ${coin.asset_label}`}
                                                    width={30}/>} <strong>{coin.asset_label}</strong></td>
                            <td>{coin.name}</td>
                            <td>
                                {season === IndexSeasonExtended.SMART
                                 ? `${(coin.max_0_profit! * 100).toFixed(2)} %`
                                 : `${(((season === IndexSeasonExtended.WEEK
                                 ? coin.week_0_profit!
                                 : season === IndexSeasonExtended.MONTH
                                 ? coin.month_0_profit!
                                 : season === IndexSeasonExtended.QUARTER
                                 ? coin.quarter_0_profit!
                                 : coin.year_0_profit!) - 1) * 100).toFixed(2)} %`
                                }
                            </td>
                            <td className="chart-cell">
                                <OverviewTableChart
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