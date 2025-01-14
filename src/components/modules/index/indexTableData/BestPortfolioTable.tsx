import {FC, useEffect, useMemo, useState} from "react";
import {TableTemplate} from "../../TableTemplate.tsx";
import {useTranslation} from "react-i18next";
import {useIndexDataContext} from "../../../../utils/providers/IndexDataProvider.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../../utils/constants";
import {useThemeContext} from "../../../../utils/providers/ThemeProvider.tsx";
import {IndexTableChart} from "./indexTableChart/IndexTableChart.tsx";
import {IndexSeason} from "../../../../utils/enums/IndexSeasonEnum.ts";
import {TopMostProfitableAsset} from "../../../../utils/types/indexPage/IndexDataStructure.ts";
import {calculateProfit} from "../../../../utils/constants/functions.ts";
import {GainSeasonTh} from "./GainSeasonTh.tsx";
import {TypographyWithPopover} from "../../TypographyWithPopover.tsx";
import {useMediaQuery} from "@mui/material";
import {getTopMostProfitableAssets} from "../../../../api/indexDataService.ts";
import {BestPortfolioTableSkeleton} from "./skeletons/BestPortfolioTableSkeleton.tsx";

export const BestPortfolioTable:FC = () => {
    const { t } = useTranslation();
    const { theme } = useThemeContext();
    const { season } = useIndexDataContext();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [top_most_profitable_assets, setTopMostProfitableAssets] = useState<TopMostProfitableAsset[]>();
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getTopMostProfitableAssets();
                setTopMostProfitableAssets(response.data);
            } catch (exception) {
                console.error(exception);
            }
        };
        getData();
    }, []);
    
    const getProfitData = useMemo(() => {
        const profitMap = (category: TopMostProfitableAsset) => ({
            Week: [
                calculateProfit(category.week_0_profit),
                calculateProfit(category.week_1_profit),
                calculateProfit(category.week_2_profit),
            ].filter(value => value !== null),
            Month: [
                calculateProfit(category.month_0_profit),
                calculateProfit(category.month_1_profit),
                calculateProfit(category.month_2_profit),
            ].filter(value => value !== null),
            Quarter: [
                calculateProfit(category.quarter_0_profit),
                calculateProfit(category.quarter_1_profit),
                calculateProfit(category.quarter_2_profit),
            ].filter(value => value !== null),
            Year: [
                calculateProfit(category.year_0_profit),
                calculateProfit(category.year_1_profit),
                calculateProfit(category.year_2_profit),
            ].filter(value => value !== null),
        });

        return (coin: TopMostProfitableAsset) => profitMap(coin)[season as keyof typeof profitMap];
    }, [season]);
    
    return (
        <TableTemplate title={t("Best portfolios")}>
            <div className={`${theme === "dark" ? "bg-dark" : "bg-white"} p-4 rounded`}>
                <table className="table no-border-row">
                    <thead>
                    <tr>
                        {!isMobile && <th><TypographyWithPopover popover={t("Order of the coins in the portfolio")}>
                            {t("Order")}
                        </TypographyWithPopover></th>}
                        <th>{t("Title")}</th>
                        <td>
                            <TypographyWithPopover popover={t("Portfolio is a collection of cryptocurrencies")}>
                                {t("Coins")}
                            </TypographyWithPopover>
                        </td>
                        <GainSeasonTh />
                        <th>{t("Graph")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {top_most_profitable_assets ? top_most_profitable_assets.map((category) =>  (
                        <tr key={category.asset_label}>
                            {!isMobile && <th>{category.order_index}</th>}
                            <td>{category.asset_label}</td>
                            <td>{isMobile ? category.quote_currencies.substring(0, 5)+" ..." : category.quote_currencies}</td>
                            <td>
                                {season === IndexSeason.WEEK ? category.week_all_profit :
                                 season === IndexSeason.MONTH ? category.month_all_profit :
                                 season === IndexSeason.QUARTER ? category.quarter_all_profit :
                                 category.year_all_profit}%
                            </td>
                            <td>
                                <IndexTableChart
                                    name={category.asset_label}
                                    data={getProfitData(category)}
                                />
                            </td>
                        </tr>
                    )) : <BestPortfolioTableSkeleton />}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <TypographyWithPopover popover={t("Portfolio is a collection of cryptocurrencies")}>
                    <Link to={routes.cryptocurrenciesList} className="text-decoration-none">
                        {t("Build your own portfolio and see how much you can earn")}
                    </Link>
                </TypographyWithPopover>
                <br/>
                <Link to={routes.register} className="btn btn-outline-warning w-10">{t("Register today!")}</Link>  
            </div>
        </TableTemplate>
    );
}