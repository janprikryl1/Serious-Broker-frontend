import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssetDetailType } from "../../../utils/types/asset/AssetDetailType";
import {toPercentTwoDecimal} from "../../../utils/functions/functions.ts";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";

type Props = {
    asset: AssetDetailType;
};

export const AssetGraphDetails: FC<Props> = ({ asset }) => {
    const { t } = useTranslation();
    const [profitType, setProfitType] = useState("Profit");
    const [timeFrame, setTimeFrame] = useState("week");

    const timeFrames = [
        { label: t("Week"), value: "week" },
        { label: t("Month"), value: "month" },
        { label: t("Quarter"), value: "quarter" },
        { label: t("Year"), value: "year" },
    ];

    const renderProfitDetails = () => {
        if (profitType === "Profit") {
            switch (timeFrame) {
                case "week":
                    return (
                        <div>
                            {asset.week_all_profit !== 0 && asset.week_all_profit !== null && <p>{t("Week all profit: ")} {toPercentTwoDecimal(asset.week_all_profit)} %</p>}
                            {asset.week_0_profit !== 0 && asset.week_0_profit !== null && <p>{t("Week 0 profit: ")} {toPercentTwoDecimal(asset.week_0_profit)} %</p>}
                            {asset.week_1_profit !== 0 && asset.week_1_profit !== null && <p>{t("Week 1 profit: ")} {toPercentTwoDecimal(asset.week_1_profit)} %</p>}
                            {asset.week_2_profit !== 0 && asset.week_2_profit !== null && <p>{t("Week 2 profit: ")} {toPercentTwoDecimal(asset.week_2_profit)} %</p>}
                            {asset.week_3_profit !== 0 && asset.week_3_profit !== null && <p>{t("Week 3 profit: ")} {toPercentTwoDecimal(asset.week_3_profit)} %</p>}
                        </div>
                    );
                case "month":
                    return (
                        <div>
                            {asset.month_all_profit !== 0 && asset.month_all_profit !== null && <p>{t("Month all profit: ")} {toPercentTwoDecimal(asset.month_all_profit)} %</p>}
                            {asset.month_0_profit !== 0 && asset.month_0_profit !== null && <p>{t("Month 0 profit: ")} {toPercentTwoDecimal(asset.month_0_profit)} %</p>}
                            {asset.month_1_profit !== 0 && asset.month_1_profit !== null && <p>{t("Month 1 profit: ")} {toPercentTwoDecimal(asset.month_1_profit)} %</p>}
                            {asset.month_2_profit !== 0 && asset.month_2_profit !== null && <p>{t("Month 2 profit: ")} {toPercentTwoDecimal(asset.month_2_profit)} %</p>}
                        </div>
                    );
                case "quarter":
                    return (
                        <div>
                            {asset.quarter_all_profit !== 0 && asset.quarter_all_profit != null && <p>{t("Quarter all profit: ")} {toPercentTwoDecimal(asset.quarter_all_profit)} %</p>}
                            {asset.quarter_0_profit !== 0 && asset.quarter_0_profit != null && <p>{t("Quarter 0 profit: ")} {toPercentTwoDecimal(asset.quarter_0_profit)} %</p>}
                            {asset.quarter_1_profit !== 0 && asset.quarter_1_profit != null && <p>{t("Quarter 1 profit: ")} {toPercentTwoDecimal(asset.quarter_1_profit)} %</p>}
                            {asset.quarter_2_profit !== 0 && asset.quarter_2_profit != null && <p>{t("Quarter 2 profit: ")} {toPercentTwoDecimal(asset.quarter_2_profit)} %</p>}
                            {asset.quarter_3_profit !== 0 && asset.quarter_3_profit != null && <p>{t("Quarter 3 profit: ")} {toPercentTwoDecimal(asset.quarter_3_profit)} %</p>}
                        </div>
                    );
                case "year":
                    return (
                        <div>
                            {asset.year_all_profit !== 0 && asset.year_all_profit != null && <p>{t("Year all profit: ")} {toPercentTwoDecimal(asset.year_all_profit)} %</p>}
                            {asset.year_0_profit !== 0 && asset.year_0_profit != null && <p>{t("Year 0 profit: ")} {toPercentTwoDecimal(asset.year_0_profit)} %</p>}
                            {asset.year_1_profit !== 0 && asset.year_1_profit != null && <p>{t("Year 1 profit: ")} {toPercentTwoDecimal(asset.year_1_profit)} %</p>}
                            {asset.year_2_profit !== 0 && asset.year_2_profit != null && <p>{t("Year 2 profit: ")} {toPercentTwoDecimal(asset.year_2_profit)} %</p>}
                        </div>
                    );
                default:
                    return null;
            }
        } else if (profitType === "Sell Profit") {
            switch (timeFrame) {
                case "week":
                    return (
                        <div>
                            {asset.sell_week_0_profit !== 0 && asset.sell_week_0_profit !== null && <p>{t("Week 0 profit: ")} {toPercentTwoDecimal(asset.sell_week_0_profit)} %</p>}
                            {asset.sell_week_1_profit !== 0 && asset.sell_week_1_profit !== null && <p>{t("Week 1 profit: ")} {toPercentTwoDecimal(asset.sell_week_1_profit)} %</p>}
                            {asset.sell_week_2_profit !== 0 && asset.sell_week_2_profit !== null && <p>{t("Week 2 profit: ")} {toPercentTwoDecimal(asset.sell_week_2_profit)} %</p>}
                            {asset.sell_week_3_profit !== 0 && asset.sell_week_3_profit !== null && <p>{t("Week 3 profit: ")} {toPercentTwoDecimal(asset.sell_week_3_profit)} %</p>}
                        </div>
                    );
                case "month":
                    return (
                        <div>
                            {asset.sell_month_0_profit !== 0 && asset.sell_month_0_profit !== null && <p>{t("Month 0 profit: ")} {toPercentTwoDecimal(asset.sell_month_0_profit)} %</p>}
                            {asset.sell_month_1_profit !== 0 && asset.sell_month_1_profit !== null && <p>{t("Month 1 profit: ")} {toPercentTwoDecimal(asset.sell_month_1_profit)} %</p>}
                            {asset.sell_month_2_profit !== 0 && asset.sell_month_2_profit !== null && <p>{t("Month 2 profit: ")} {toPercentTwoDecimal(asset.sell_month_2_profit)} %</p>}
                        </div>
                    );
                case "quarter":
                    return (
                        <div>
                            {asset.sell_quarter_0_profit !== 0 && asset.sell_quarter_0_profit !== null && <p>{t("Quarter 0 profit: ")} {toPercentTwoDecimal(asset.sell_quarter_0_profit)} %</p>}
                            {asset.sell_quarter_1_profit !== 0 && asset.sell_quarter_1_profit !== null && <p>{t("Quarter 1 profit: ")} {toPercentTwoDecimal(asset.sell_quarter_1_profit)} %</p>}
                            {asset.sell_quarter_2_profit !== 0 && asset.sell_quarter_2_profit !== null && <p>{t("Quarter 2 profit: ")} {toPercentTwoDecimal(asset.sell_quarter_2_profit)} %</p>}
                            {asset.sell_quarter_3_profit !== 0 && asset.sell_quarter_3_profit !== null && <p>{t("Quarter 3 profit: ")} {toPercentTwoDecimal(asset.sell_quarter_3_profit)} %</p>}
                        </div>
                    );
                case "year":
                    return (
                        <div>
                            {asset.sell_year_0_profit !== 0 && asset.sell_year_0_profit !== null && <p>{t("Year 0 profit: ")} {toPercentTwoDecimal(asset.sell_year_0_profit)} %</p>}
                            {asset.sell_year_1_profit !== 0 && asset.sell_year_1_profit !== null && <p>{t("Year 1 profit: ")} {toPercentTwoDecimal(asset.sell_year_1_profit)} %</p>}
                            {asset.sell_year_2_profit !== 0 && asset.sell_year_2_profit !== null && <p>{t("Year 2 profit: ")} {toPercentTwoDecimal(asset.sell_year_2_profit)} %</p>}
                        </div>
                    );
            }
        }
    };

    return (
        <div className="service-details__content mb-5" style={{border: "0.5px solid #3e3a32", borderRadius: "16px", padding: "20px", color:"white"}}>
            <p style={{fontSize: "25px", fontWeight:"bold"}}>{t("Statistics")}</p>
            <p style={{fontSize: "15px"}}>{t("Last update: ")} {toCzechDate(asset.last_update)}</p>

            <div className="d-flex gap-3 mb-3">
                <div>
                    <label htmlFor="profitType" className="form-label" style={{fontSize: "13px"}}>{t("Profit")}</label>
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
                <div>
                    <label htmlFor="timeFrame" className="form-label" style={{fontSize: "13px"}}>{t("Select season")}</label>
                    <select
                        id="timeFrame"
                        className="form-select"
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                    >
                        {timeFrames.map((frame) => (
                            <option key={frame.value} value={frame.value}>{frame.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-4" style={{fontSize: "14px"}}>
                {renderProfitDetails()}
            </div>
        </div>
    );
};
