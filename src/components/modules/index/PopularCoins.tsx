import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { MostProfitable } from "../../../utils/types/indexPage/IndexDataStructure.ts";
import { FC } from "react";
import { Link } from "react-router-dom";
import { areEstablishedCryptocurrenciesOrNewcomersToTheMarketBetterArticle, routes, whatIsMarketCapitalizationArticle } from "../../../utils/constants";
import { TableTemplate } from "../TableTemplate.tsx";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

type Props = {
    lastCoinmarketCupCoins: MostProfitable[];
};

export const PopularCoins: FC<Props> = ({ lastCoinmarketCupCoins }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const {theme} = useThemeContext();

    return (
        <TableTemplate title="Last Coinmarketcup Coins">
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <p className="mb-3">{t("Which coins scored recently in Coinmarketcap?")}</p>
                <table className="table no-border-row">
                    <thead>
                    <tr>
                        <th>{t("Order")}</th>
                        <th>Coin</th>
                        <th>{t("Position")}</th>
                        <th>{t("Profit")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lastCoinmarketCupCoins.map((coin, index) => (
                        <tr key={coin.cmc_rank}>
                            <td>{coin.cmc_rank}</td>
                            <td>{coin.asset_label}</td>
                            <td>{coin.week_0_pos}</td>
                            <td>{((coin.week_0_profit - 1) * 100).toFixed(2)} %</td>
                            {!isMobile &&
                                index === Math.round(lastCoinmarketCupCoins.length / 2) - 1 && (
                                    <td
                                        colSpan={isMobile ? 2 : 4}
                                        rowSpan={2}
                                        className="text-center align-middle no-border-row"
                                    >
                                        <Link
                                            to={whatIsMarketCapitalizationArticle}
                                            className="btn btn-warning text-dark w-100"
                                            style={{marginLeft:10}}
                                        >
                                            {t("What is the market capitalization?")}
                                        </Link>
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
                            to={areEstablishedCryptocurrenciesOrNewcomersToTheMarketBetterArticle}
                            className="text-decoration-none"
                        >
                            {t("Are established cryptocurrencies or newcomers to the market better?")}
                        </Link>
                    </div>
                    <div className="col-sm-4">
                        <Link to={routes.signIn} className="btn btn-outline-warning w-100">
                            {t("Sign in")}
                        </Link>
                    </div>
                </div>
            </div>
        </TableTemplate>
    );
};