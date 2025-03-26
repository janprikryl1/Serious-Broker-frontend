import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssetDetailType } from "../../../utils/types/asset/AssetDetailType";
import {toPercentTwoDecimal} from "../../../utils/functions/functions.ts";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";
import {MyPortfolioType} from "../../../utils/types/asset/MyPortfolioType.ts";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {AssetGraphPriceDetails} from "./AssetGraphPriceDetails.tsx";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";

type Props = {
    asset: AssetDetailType | MyPortfolioType;
    selectedPeriod: QuotedCurrenciesPeriod;
    currency: Currencies;
    currencyValue: number;
    showPriceDetails?: boolean;
};

const renderRow = (label: string, value: number | null) => {
    if (value !== 0 && value !== null) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                }}
            >
                <span>{label}</span>
                <span style={{fontWeight: "bold"}}>{toPercentTwoDecimal(value)} %</span>
            </div>
        );
    }
    return null;
};

export const AssetGraphDetails: FC<Props> = ({ asset, selectedPeriod, currency, currencyValue, showPriceDetails }) => {
    const { t } = useTranslation();
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

    return (
        <div className="service-details__content mb-5" style={{
            border: "0.5px solid #3e3a32",
            borderRadius: "16px",
            padding: "20px",
            color: "white",
            height: "90%"
        }}>
            <p style={{fontSize: "25px", fontWeight: "bold", marginBottom: "5px"}}>{t("Statistics")}</p>
            <p style={{fontSize: "15px", marginBottom: "5px"}}>{t("Last update: ")} {toCzechDate(asset.last_update)}</p>

            <div className="d-flex gap-3">
                <select
                    id="profitType"
                    className="form-select"
                    value={profitType}
                    onChange={(e) => setProfitType(e.target.value)}
                >
                    <option value="Profit">{t("Profit")}</option>
                    <option value="Sell Profit">{t("Sell profit")}</option>
                </select>
            </div>

            <div className="mt-4" style={{fontSize: "12px"}}>
                {renderProfitDetails()}
            </div>
            {showPriceDetails && <AssetGraphPriceDetails currency={currency} currencyValue={currencyValue} />}
        </div>
    );
};
