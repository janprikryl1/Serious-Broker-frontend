import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetDetailType } from "../../../utils/types/asset/AssetDetailType";
import {toCzechDate} from "../../../utils/functions/dateFunctions.ts";
import {MyPortfolioType} from "../../../utils/types/asset/MyPortfolioType.ts";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {AssetGraphPriceDetails} from "./AssetGraphPriceDetails.tsx";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";
import {useRenderProfitDetails} from "../../../utils/hooks/useRenderProfitDetails.tsx";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";

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
      <OutlineContainer className="tw-h-full" style={{margin: 0, padding: "16px"}}>
        <div className="tw-mb-2 tw-text-xl tw-font-semibold sm:tw-text-2xl">{t("Statistics")}</div>
        <p className="tw-mb-3 tw-text-xs tw-text-stone-400 sm:tw-text-sm">{t("Last update: ")} {toCzechDate(asset.last_update)}</p>

            <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-center">
                <select
                    id="profitType"
                    className="form-select select-box-outline"
                    value={profitType}
                    onChange={(e) => setProfitType(e.target.value)}
                    style={{width: "100%", maxWidth: "220px", fontSize: "14px"}}
                >
                    <option value="Profit">{t("Profit")}</option>
                    <option value="Sell Profit">{t("Sell profit")}</option>
                </select>
            </div>

            <div className="tw-mt-4">
                {renderProfitDetails()}
            </div>
            {showPriceDetails && <AssetGraphPriceDetails currency={currency} currencyValue={currencyValue} />}
      </OutlineContainer>
    );
};
