import {useMemo} from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider.tsx";
import { useIndexDataContext } from "../../../../utils/providers/IndexDataProvider.tsx";
import { TableTemplate } from "../../TableTemplate.tsx";
import { IndexTableChart } from "./indexTableChart/IndexTableChart.tsx";
import { routes } from "../../../../utils/constants";
import { AssetProfitData } from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {calculateProfit} from "../../../../utils/constants/functions.ts";
import {GainSeasonTh} from "./GainSeasonTh.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";

export const MostProfitableLastSelectedPeriod: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const { theme } = useThemeContext();
    const { data, season } = useIndexDataContext();

    const getProfitData = useMemo(() => {
        const profitMap = (coin: AssetProfitData) => ({
            Week: [
                calculateProfit(coin.week_0_profit),
                calculateProfit(coin.week_1_profit),
                calculateProfit(coin.week_2_profit),
            ].filter(value => value !== null),
            Month: [
                calculateProfit(coin.month_0_profit),
                calculateProfit(coin.month_1_profit),
                calculateProfit(coin.month_2_profit),
            ].filter(value => value !== null),
            Quarter: [
                calculateProfit(coin.quarter_0_profit),
                calculateProfit(coin.quarter_1_profit),
                calculateProfit(coin.quarter_2_profit),
            ].filter(value => value !== null),
            Year: [
                calculateProfit(coin.year_0_profit),
                calculateProfit(coin.year_1_profit),
                calculateProfit(coin.year_2_profit),
            ].filter(value => value !== null),
        });

        return (coin: AssetProfitData) => profitMap(coin)[season as keyof typeof profitMap];
    }, [season]);
    
    return (
        <TableTemplate title={`The most profitable cryptocurrencies over the last ${season.toLowerCase()}`}>
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <table className="table no-border-row">
                    <thead>
                    <tr>
                        <th>{t("Position")}</th>
                        <th>Coin</th>
                        <GainSeasonTh />
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.last_most_profitable.map((coin, index) => (
                        <tr key={coin.cmc_rank}>
                            <td>{coin.week_0_pos}</td>
                            <td>{coin.asset_label}</td>
                            <td>{((coin.week_0_profit - 1) * 100).toFixed(2)} %</td>
                            <td>
                                <IndexTableChart
                                    name={coin.asset_label}
                                    data={getProfitData(coin)}
                                />
                            </td>
                            {!isMobile && index === Math.round(data.last_most_profitable.length / 2) - 1 && (
                                <td
                                    rowSpan={2}
                                    className="text-center align-middle no-border-row"
                                >
                                    <TypographyWithPopover popover={t(t("More in chart section"))}>
                                        <>
                                            <span>{t("Want to")}</span><br/>
                                            <span>{t("know more")}</span><br/>
                                            <span>?</span>
                                        </>
                                    </TypographyWithPopover>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <div className="row">
                    <div className="col-sm-8">
                        <Link to={routes.graphs} className="text-decoration-none">
                            {t("Want to know the profits of other cryptocurrencies?")}
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to={routes.register} className="btn btn-outline-warning w-80 mt-3">
                            {t("Register")}
                        </Link>
                    </div>
                </div>
            </div>
        </TableTemplate>
    );
};
