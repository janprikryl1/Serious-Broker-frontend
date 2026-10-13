import {useState} from "react";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";
import {renderRow} from "../functions/renderRow.tsx";
import {useTranslation} from "react-i18next";
import {AssetDetailType} from "../types/asset/AssetDetailType.ts";
import {MyPortfolioType} from "../types/asset/MyPortfolioType.ts";

export const useRenderProfitDetails = (selectedPeriod: QuotedCurrenciesPeriod, asset: AssetDetailType | MyPortfolioType) => {
    const {t} = useTranslation();
    const [profitType, setProfitType] = useState("Profit");

    const renderProfitDetails = () => {
        if (profitType === "Profit") {
            switch (selectedPeriod) {
                case QuotedCurrenciesPeriod.week:
                case QuotedCurrenciesPeriod.day:
                    return (
                        <>
                            {renderRow(t("Week all profit: "), asset.week_all_profit)}
                            {renderRow(t("Week 0 profit: "), asset.week_0_profit)}
                            {renderRow(t("Week 1 profit: "), asset.week_1_profit)}
                            {renderRow(t("Week 2 profit: "), asset.week_2_profit)}
                            {renderRow(t("Week 3 profit: "), asset.week_3_profit)}
                        </>
                    );
                case QuotedCurrenciesPeriod.month:
                    return (
                        <>
                            {renderRow(t("Month all profit: "), asset.month_all_profit)}
                            {renderRow(t("Month 0 profit: "), asset.month_0_profit)}
                            {renderRow(t("Month 1 profit: "), asset.month_1_profit)}
                            {renderRow(t("Month 2 profit: "), asset.month_2_profit)}
                        </>
                    );
                case QuotedCurrenciesPeriod.year:
                    return (
                        <>
                            {renderRow(t("Year all profit: "), asset.year_all_profit)}
                            {renderRow(t("Year 0 profit: "), asset.year_0_profit)}
                            {renderRow(t("Year 1 profit: "), asset.year_1_profit)}
                            {renderRow(t("Year 2 profit: "), asset.year_2_profit)}
                        </>
                    );
            }
        } else if (profitType === "Sell Profit") {
            switch (selectedPeriod) {
                case QuotedCurrenciesPeriod.week:
                case QuotedCurrenciesPeriod.day:
                    return (
                        <>
                            {renderRow(t("Week 0 profit: "), asset.sell_week_0_profit)}
                            {renderRow(t("Week 1 profit: "), asset.sell_week_1_profit)}
                            {renderRow(t("Week 2 profit: "), asset.sell_week_2_profit)}
                            {renderRow(t("Week 3 profit: "), asset.sell_week_3_profit)}
                        </>
                    );
                case QuotedCurrenciesPeriod.month:
                    return (
                        <>
                            {renderRow(t("Month 0 profit: "), asset.sell_month_0_profit)}
                            {renderRow(t("Month 1 profit: "), asset.sell_month_1_profit)}
                            {renderRow(t("Month 2 profit: "), asset.sell_month_2_profit)}
                        </>
                    );
                case QuotedCurrenciesPeriod.year:
                    return (
                        <>
                            {renderRow(t("Year 0 profit: "), asset.sell_year_0_profit)}
                            {renderRow(t("Year 1 profit: "), asset.sell_year_1_profit)}
                            {renderRow(t("Year 2 profit: "), asset.sell_year_2_profit)}
                        </>
                    );
            }
        }
    };

    return {
        profitType,
        setProfitType,
        renderProfitDetails
    }
}