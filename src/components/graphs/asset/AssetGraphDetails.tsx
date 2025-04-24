import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetDetailType } from "../../../utils/types/asset/AssetDetailType";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";
import {MyPortfolioType} from "../../../utils/types/asset/MyPortfolioType.ts";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {AssetGraphPriceDetails} from "./AssetGraphPriceDetails.tsx";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";
import {useRenderProfitDetails} from "../../../utils/hooks/useRenderProfitDetails.tsx";

type Props = {
    asset: AssetDetailType | MyPortfolioType;
    selectedPeriod: QuotedCurrenciesPeriod;
    currency: Currencies;
    currencyValue: number;
    showPriceDetails?: boolean;
};

export const AssetGraphDetails: FC<Props> = ({ asset, selectedPeriod, currency, currencyValue, showPriceDetails }) => {
    const { t } = useTranslation();
    const {profitType, setProfitType, renderProfitDetails} = useRenderProfitDetails(selectedPeriod, asset);

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
