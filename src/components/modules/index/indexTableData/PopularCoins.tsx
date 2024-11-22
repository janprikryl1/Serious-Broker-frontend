import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import {useThemeContext} from "../../../../utils/providers/ThemeProvider.tsx";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";
import {TableTemplate} from "../../TableTemplate.tsx";
import {
    areEstablishedCryptocurrenciesOrNewcomersToTheMarketBetterArticle, routes,
    whatIsMarketCapitalizationArticle
} from "../../../../utils/constants";
import {calculateProfit} from "../../../../utils/constants/functions.ts";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";

export const PopularCoins: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const {theme} = useThemeContext();
    const {data} = useIndexDataContext();

    return (
        <TableTemplate title="Last Coinmarketcup Coins">
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <TypographyWithPopover
                    popover={t("Coinmarketcap is a website that provides information and data such as prices, trade volumes, market capitalization on cryptocurrencies.")}>
                    <p className="mb-3">{t("Which coins scored recently in Coinmarketcap?")}</p>
                </TypographyWithPopover>
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
                    {data.last_coinmarketcup_coins.map((coin, index) => (
                        <tr key={coin.cmc_rank}>
                            <td>{coin.cmc_rank}</td>
                            <td>{coin.asset_label}</td>
                            <td>{coin.week_0_pos}</td>
                            <td>{(calculateProfit(coin.week_0_profit) ?? 0).toFixed(2)} %</td>
                            {!isMobile &&
                                index === Math.round(data.last_coinmarketcup_coins.length / 2) - 1 && (
                                    <td
                                        rowSpan={2}
                                        className="text-center align-middle"
                                    >
                                        <Link
                                            to={whatIsMarketCapitalizationArticle}
                                            className="btn btn-warning text-dark w-100"
                                        >
                                            <span>{t("What is")}</span><br/>
                                            <span>{t("the market")}</span><br/>
                                            <span>{t("capitalization")}</span><br/>
                                            <span>?</span>
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