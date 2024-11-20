import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import {AssetProfitData} from "../../../utils/types/indexPage/IndexDataStructure.ts";
import { FC } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import { TableTemplate } from "../TableTemplate.tsx";
import {Button} from "react-bootstrap";
import {IndexTableChart} from "./indexTableChart/IndexTableChart.tsx";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

type Props = {
    mostProfitableLastWeek: AssetProfitData[];
};

export const MostProfitableLastWeek: FC<Props> = ({ mostProfitableLastWeek }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const {theme} = useThemeContext();

    return (
        <TableTemplate title="The most profitable cryptocurrencies over the last week">
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <table className="table no-border-row">
                    <thead>
                    <tr>
                        <th>{t("Position")}</th>
                        <th>Coin</th>
                        <td>{t("Week 0 profit: ")}</td>
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostProfitableLastWeek.map((coin, index) => (
                        <tr key={coin.cmc_rank}>
                            <td>{coin.week_0_pos}</td>
                            <td>{coin.asset_label}</td>
                            <td>{((coin.week_0_profit - 1) * 100).toFixed(2)} %</td>
                            <td><IndexTableChart
                            /></td>
                            {!isMobile &&
                                index === Math.round(mostProfitableLastWeek.length / 2) - 1 && (
                                    <td
                                        colSpan={isMobile ? 2 : 4}
                                        rowSpan={2}
                                        className="text-center align-middle no-border-row"
                                    >
                                        <Button variant="outline-warning"
                                                style={{marginLeft: 10}}>{t("Want to know more?")}</Button>
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
                        <Link
                            to={routes.graphs}
                            className="text-decoration-none"
                        >
                            {t("Want to know the profits of other cryptocurrencies?")}
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to={routes.register} className="btn btn-outline-warning w-100">
                            {t("Register")}
                        </Link>
                    </div>
                </div>
            </div>
        </TableTemplate>
);
};