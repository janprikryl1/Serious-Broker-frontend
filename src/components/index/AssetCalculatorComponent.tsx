import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetCalculatorSingleCoin } from "./AssetCalculatorSingleCoin.tsx";
import "../../styles/sass/components/index-calculator.scss";
import {AssetCalculatorComponentTextColumn} from "./AssetCalculatorComponentTextColumn.tsx";
import {GlassCard} from "../reusable/GlassCard.tsx";

export const AssetCalculatorComponent: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="asset-calculator tw-mt-5">
            <div className="container">
                    <h2 className="tw-mb-2 tw-text-2xl tw-font-bold tw-text-white sm:tw-text-3xl lg:tw-text-4xl">
                        {t("Crypto calculator")}
                    </h2>
                    <p className="subtitle">
                        {t("Calculate How Much You Could Have Earned If You Started Investing In Crypto Earlier With Serious.Broker")}
                    </p>

                    <div className="calculator-main-layout">
                        <AssetCalculatorSingleCoin />
                        <AssetCalculatorComponentTextColumn />
                    </div>
                </div>
        </div>
    );
}