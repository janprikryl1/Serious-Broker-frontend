import { FC, useState } from "react";
import { AssetDetailType } from "../../../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import { toCzechDate } from "../../../../utils/constants/functions.ts";

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
                            <p>{t("Week all profit: ")} {asset.week_all_profit}</p>
                            <p>{t("Week 0 profit: ")} {asset.week_0_profit}</p>
                            <p>{t("Week 1 profit: ")} {asset.week_1_profit}</p>
                            <p>{t("Week 2 profit: ")} {asset.week_2_profit}</p>
                            <p>{t("Week 3 profit: ")} {asset.week_3_profit}</p>
                        </div>
                    );
                case "month":
                    return (
                        <div>
                            <p>{t("Month all profit: ")} {asset.month_all_profit}</p>
                            <p>{t("Month 0 profit: ")} {asset.month_0_profit}</p>
                            <p>{t("Month 1 profit: ")} {asset.month_1_profit}</p>
                            <p>{t("Month 2 profit: ")} {asset.month_2_profit}</p>
                        </div>
                    );
                case "quarter":
                    return (
                        <div>
                            <p>{t("Quarter all profit: ")} {asset.quarter_all_profit}</p>
                            <p>{t("Quarter 0 profit: ")} {asset.quarter_0_profit}</p>
                            <p>{t("Quarter 1 profit: ")} {asset.quarter_1_profit}</p>
                            <p>{t("Quarter 2 profit: ")} {asset.quarter_2_profit}</p>
                            <p>{t("Quarter 3 profit: ")} {asset.quarter_3_profit}</p>
                        </div>
                    );
                case "year":
                    return (
                        <div>
                            <p>{t("Year all profit: ")} {asset.year_all_profit}</p>
                            <p>{t("Year 0 profit: ")} {asset.year_0_profit}</p>
                            <p>{t("Year 1 profit: ")} {asset.year_1_profit}</p>
                            <p>{t("Year 2 profit: ")} {asset.year_2_profit}</p>
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
                            <p>{t("Week 0 profit: ")} {asset.sell_week_0_profit}</p>
                            <p>{t("Week 1 profit: ")} {asset.sell_week_1_profit}</p>
                            <p>{t("Week 2 profit: ")} {asset.sell_week_2_profit}</p>
                            <p>{t("Week 3 profit: ")} {asset.sell_week_3_profit}</p>
                        </div>
                    );
                case "month":
                    return (
                        <div>
                            <p>{t("Month 0 profit: ")} {asset.sell_month_0_profit}</p>
                            <p>{t("Month 1 profit: ")} {asset.sell_month_1_profit}</p>
                            <p>{t("Month 2 profit: ")} {asset.sell_month_2_profit}</p>
                        </div>
                    );
                case "quarter":
                    return (
                        <div>
                            <p>{t("Quarter 0 profit: ")} {asset.sell_quarter_0_profit}</p>
                            <p>{t("Quarter 1 profit: ")} {asset.sell_quarter_1_profit}</p>
                            <p>{t("Quarter 2 profit: ")} {asset.sell_quarter_2_profit}</p>
                            <p>{t("Quarter 3 profit: ")} {asset.sell_quarter_3_profit}</p>
                        </div>
                    );
                case "year":
                    return (
                        <div>
                            <p>{t("Year 0 profit: ")} {asset.sell_year_0_profit}</p>
                            <p>{t("Year 1 profit: ")} {asset.sell_year_1_profit}</p>
                            <p>{t("Year 2 profit: ")} {asset.sell_year_2_profit}</p>
                        </div>
                    );
            }
        }
    };

    return (
        <div className="service-details__content mb-5">
            <p><strong>{t("Coins")}: {asset.COINS}</strong></p>
            <p>{t("Last update: ")} {toCzechDate(asset.last_update)}</p>

            <div className="d-flex gap-3 mb-3">
                <div>
                    <label htmlFor="profitType" className="form-label">{t("Profit")}</label>
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
                    <label htmlFor="timeFrame" className="form-label">{t("Select season")}</label>
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

            <div className="mt-4">
                <h5>{t("Profit Details")}</h5>
                {renderProfitDetails()}
            </div>
        </div>
    );
};
